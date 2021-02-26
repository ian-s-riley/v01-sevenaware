import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { searchFields, getForm, searchForms } from '../../graphql/queries';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import FixedHelp from "components/FixedHelp/FixedHelp";
import Field from 'components/Field/Field'

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";

import avatar from "assets/img/help/form-help-icon-01.png";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles); 
const initialFormState = { name: '', parentFormId: '' }

export default function FormTemplate() {
    const history = useHistory();
    const classes = useStyles();
    const tableCellClasses = classnames(classes.tableCell);
 
    const formId = history.location.state.formId
    const [fixedClasses, setFixedClasses] = useState("dropdown");

    const [form, setForm] = useState(initialFormState)
    const [fields, setFields] = useState([])
    const [subforms, setSubforms] = useState([])
    const [incompleteSubforms, setIncompleteSubforms] = useState([])
    const [siblingForms, setSiblingForms] = useState([])
    const [nextFormId, setNextFormId] = useState('')
    

    useEffect(() => {
      fetchForm();
      fetchFields();
      fetchSubforms()
    }, [formId]);

    useEffect(() => {
      fetchSiblingForms()
    }, [form]);
  
    async function fetchForm() {
      const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});  
      //console.log('formFromAPI', formFromAPI)          
      setForm(formFromAPI.data.getForm )
    }

    async function fetchFields() {  
      const apiData = await API.graphql(graphqlOperation(searchFields, {
        filter: { formId: { match: formId }},
        sort: {
          direction: 'asc',
          field: 'order'
        }
      }));
      const fieldsFromAPI = apiData.data.searchFields.items 
      setFields(fieldsFromAPI);  
    }

    async function fetchSubforms() {
      const apiData = await API.graphql(graphqlOperation(searchForms, {
        filter: { parentFormId: { match: formId }},
        sort: {
          direction: 'asc',
          field: 'order'
        }
      }));
      //show all subforms
      const formsFromAPI = apiData.data.searchForms.items 
      setSubforms(formsFromAPI)

      //get the incomplete subforms for navigation
      const incompleteSubformFromAPI = formsFromAPI.filter(incompleteForm => incompleteForm.isComplete === '');
      //console.log('incompleteSubformFromAPI', incompleteSubformFromAPI)
      setIncompleteSubforms(incompleteSubformFromAPI)
    }

    async function fetchSiblingForms() {
      const apiData = await API.graphql(graphqlOperation(
        searchForms, {
          filter: {             
            and: [
              { id: { ne: formId } },
              { parentFormId: { match: form.parentFormId } },
              { isComplete: { eq: ''} }
            ]
          },
          sort: {
            direction: 'asc',
            field: 'order'
          }
        }
        ))
      const formsFromAPI = apiData.data.searchForms.items 
      setSiblingForms(formsFromAPI)
      //console.log('siblingFormsFromAPI', formsFromAPI)
    }

    async function handlePublishForm(isComplete) {      
      await API.graphql({ 
                          query: updateFormMutation, 
                          variables: { input: {
                            id: form.id, 
                            isComplete: isComplete,
                          }} 
                        });
      console.log('handlePublishForm')
      handleNextClick()
    }

    function handleNextClick() {  
      console.log('handleNextClick: incompleteSubforms', incompleteSubforms)   
      console.log('handleNextClick: siblingForms', siblingForms)   
      console.log('handleNextClick: parentFormId', form.parentFormId)   

      if (incompleteSubforms.length > 0) {
        //go to the next incomplete subform of this form, if there is one
        console.log('handleNextClick: this form has subforms, first incomplete subform:', incompleteSubforms[0].id)
        history.push("/admin/formtemplate", { formId: incompleteSubforms[0].id })
      } else if (siblingForms.length > 0) {
        if (form.parentFormId === '-1') {
          console.log('handleNextClick: no incomplete subforms, this is a top level form:', form.parentFormId)
          history.push("/admin/sevenaforms")
        } else {
          console.log('handleNextClick: no incomplete subforms, first incomplete sibling:', siblingForms[0].id)
          history.push("/admin/formtemplate", { formId: siblingForms[0].id })
        }
      } else {
        //no sub or sibling forms, go to the parent
        console.log('handleNextClick: no subform or sibling - goto parent', form.parentFormId)
        history.push("/admin/formtemplate", { formId: form.parentFormId })
      }
    }

    function handleBackClick() {    
      if (form.parentFormId === '-1') {
        history.push("/admin/sevenaforms")
      } else {
        history.push("/admin/formtemplate", { formId: form.parentFormId })
      }
    }    

    async function handleSelectForm({ id }) { 
      history.push("/admin/formtemplate", { formId: id })
    }  

    const handleFixedClick = () => {
      if (fixedClasses === "dropdown") {
          setFixedClasses("dropdown show");
      } else {
           setFixedClasses("dropdown");
      }
      }; 


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>{form.name}</h4>
              <p className={classes.cardCategoryWhite}>{form.description}</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
              {
                  fields.map(field => (
                    <Field
                      id={field.id}
                      name={field.name}
                      description={field.description}
                      value={field.value}
                      disabled={false}
                      md={6}
                      key={field.id}
                    />
                  ))
                }                   
              </GridContainer>        
            </CardBody>
            <CardFooter>
              <Button color="info" onClick={handleBackClick}>Back</Button>
              {form.isComplete ? (<Button onClick={() => handlePublishForm('')}>Unpublish</Button>) : (<Button color="success" onClick={() => handlePublishForm('true')}>Publish</Button>)}
              <Button color="info" onClick={handleNextClick}>Next</Button>
            </CardFooter>
          </Card>
          <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="warning">
                    <h4 className={classes.cardTitleWhite}>Subforms</h4>
                    <p className={classes.cardCategoryWhite}>
                        We'll continue your appliction by getting more information.
                    </p>
                    </CardHeader>
                    <CardBody>
                    <Table className={classes.table}>
                      <TableBody>
                      {
                        subforms.map(subform => (
                          <TableRow className={classes.tableRow} key={subform.id}>
                          <TableCell className={tableCellClasses}>
                              <Checkbox
                                checked={subform.isComplete !== ''}
                                checkedIcon={<Check className={classes.checkedIcon} />}
                                icon={<Check className={classes.uncheckedIcon} />}
                                classes={{
                                  checked: classes.checked,
                                  root: classes.root
                                }}
                              />
                            </TableCell>
                            <TableCell className={tableCellClasses}>{subform.name}</TableCell>
                            <TableCell className={tableCellClasses}>{subform.description}</TableCell>
                            <TableCell className={tableCellClasses}>
                            <Button
                                onClick={() => handleSelectForm(subform)}
                                justIcon
                                color="success"
                                className={classes.marginRight}
                              >
                                <Edit className={classes.icons} />
                              </Button>
                            </TableCell>
                        </TableRow>
                        ))
                      }
                      </TableBody>
                    </Table>                      
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>{form.helpCategory}</h6>
              <h4 className={classes.cardTitle}>{form.helpTitle}</h4>
              <p className={classes.description}>
                {form.helpDescription}
              </p>
              <Button color="success" round>
                more...
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <FixedHelp
          legal={form.legal}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        />
    </div>
  );
}
