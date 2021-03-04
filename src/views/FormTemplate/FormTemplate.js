import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm } from '../../graphql/customQueries';
import { listFields, listForms } from '../../graphql/queries';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import NavPills from "components/NavPills/NavPills.js";

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
import SevenAField from 'components/SevenAField/SevenAField'

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Info from "@material-ui/icons/Info";
import LocationOn from "@material-ui/icons/LocationOn";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Dashboard from "@material-ui/icons/Dashboard";
import Schedule from "@material-ui/icons/Schedule";

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
    

    useEffect(() => {
      fetchForm()
    }, [formId]);

    // useEffect(() => {
    //   fetchSiblingForms()
    // }, [form]);
  
    async function fetchForm() {
      const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});    
      console.log('fetchForm : formFromAPI', formFromAPI)          
      //console.log('fetchForm : formFromAPI.data.getForm', formFromAPI.data.getForm)          
      //console.log('fetchForm : formFromAPI.data.getForm.Subform.items', formFromAPI.data.getForm.Subform.items)     
      //console.log('fetchForm : formFromAPI.data.getForm.Field.items', formFromAPI.data.getForm.Field.items)     
      setForm(formFromAPI.data.getForm)            
      setSubforms(formFromAPI.data.getForm.Subform.items)  
      setFields(formFromAPI.data.getForm.Field.items)
    }

    async function fetchSiblingForms() {
      const apiData = await API.graphql(graphqlOperation(
        listForms, {
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
      const formsFromAPI = apiData.data.listForms.items 
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


  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardBody>
              <NavPills
                color="rose"
                horizontal={{
                  tabsGrid: { xs: 12, sm: 12, md: 2 },
                  contentGrid: { xs: 12, sm: 12, md: 10 }
                }}
                tabs={[
                  {
                    tabButton: "Form",
                    tabIcon: Dashboard,
                    tabContent: (
                      <Card>
                        <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}>{form.name}</h4>
                          <p className={classes.cardCategoryWhite}>{form.description}</p>
                        </CardHeader>
                        <CardBody>
                          <GridContainer>
                          {
                              fields.map(field => (
                                <SevenAField key={field.Field.id} field={field.Field} />
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
                    )
                  },
                  {
                    tabButton: "Next Steps",
                    tabIcon: Info,
                    tabContent: (
                      <Card>
                        <CardHeader color="warning">
                        <h4 className={classes.cardTitleWhite}>Application Process</h4>
                        <p className={classes.cardCategoryWhite}>
                            A quick preview of more info we'll need to collect:
                        </p>
                        </CardHeader>
                        <CardBody>
                        <Table className={classes.table}>
                          <TableBody>
                          {
                            subforms.map(subform => (
                              <TableRow className={classes.tableRow} key={subform.Subform.id}>
                              <TableCell className={tableCellClasses}>
                                  <Checkbox
                                    checked={subform.Subform.isComplete !== ''}
                                    checkedIcon={<Check className={classes.checkedIcon} />}
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                      checked: classes.checked,
                                      root: classes.root
                                    }}
                                  />
                                </TableCell>
                                <TableCell className={tableCellClasses}>{subform.Subform.name}</TableCell>
                                <TableCell className={tableCellClasses}>{subform.Subform.description}</TableCell>
                                <TableCell className={tableCellClasses}>
                                <Button
                                    onClick={() => handleSelectForm(subform.Subform)}
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
                    )
                  },
                  {
                    tabButton: "Help Center",
                    tabIcon: HelpOutline,
                    tabContent: (
                      <Card>
                        <CardHeader>
                          <h4 className={classes.cardTitle}>{form.helpCategory}</h4>
                          <p className={classes.cardCategory}>
                            {form.helpTitle}
                          </p>
                        </CardHeader>
                        <CardBody>
                          {form.helpDescription}
                        </CardBody>
                      </Card>
                    )
                  },
                  {
                    tabButton: "Legal Info",
                    tabIcon: Gavel,
                    tabContent: (
                      <Card>
                        <CardBody>
                          {form.legalDescription}
                        </CardBody>
                      </Card>
                    )
                  }
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          
        </GridItem>
      </GridContainer>        
    </div>
  );
}
