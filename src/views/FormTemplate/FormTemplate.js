import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, fieldsByForm, formsByForm, listSubformFormJoins } from '../../graphql/queries';
import { updateForm as updateFormMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import NavPills from "components/NavPills/NavPills.js";
import FormControlLabel from "@material-ui/core/FormControlLabel";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import SevenAField from 'components/SevenAField/SevenAField'

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Info from "@material-ui/icons/Info";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Dashboard from "@material-ui/icons/Dashboard";

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
const initialFormState = { name: '' }

export default function FormTemplate() {
    const history = useHistory();
    const classes = useStyles();
    const tableCellClasses = classnames(classes.tableCell);
 
    const formId = history.location.state.formId
    const [form, setForm] = useState(initialFormState)
    //const [order, setOrder] = useState(0)
    const [parentFormId, setParentFormId] = useState('')
    const [fields, setFields] = useState([])
    const [subforms, setSubforms] = useState([])
    const [incompleteSubforms, setIncompleteSubforms] = useState([])
    const [siblingForms, setSiblingForms] = useState([])
    const [loading, setLoading] = useState(true)
    

    useEffect(() => {
      fetchForm()
      fetchFamilyForms()
      fetchSubforms()
      fetchFields()      
    }, [formId]);

    // useEffect(() => {
    //   fetchSiblingForms()
    // }, [parentFormId]);
  
    async function fetchForm() {
      const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});    
      //console.log('fetchForm : formFromAPI', formFromAPI)              
      setForm(formFromAPI.data.getForm)    
    }

    async function fetchFamilyForms() {
      //get the details for the parent form and go to that form
      const apiData = await API.graphql(graphqlOperation(listSubformFormJoins, {
        filter: { SubformID: { eq: formId }},
      }));        
      const parentFormsFromAPI = apiData.data.listSubformFormJoins.items
      //console.log('fetchParentForm: parentFormsFromAPI', parentFormsFromAPI)
      if (parentFormsFromAPI.length > 0) {
        setParentFormId(parentFormsFromAPI[0].FormID)    

        const formsFromAPI = await API.graphql({ 
          query: formsByForm, 
          variables: { 
            FormID: parentFormsFromAPI[0].FormID, 
            order: {gt: parentFormsFromAPI[0].order},
            filter: {SubformID: {ne: formId}},
          },
        }); 
        //console.log('fetchParentForm : formsFromAPI.data.formsByForm.items', formsFromAPI.data.formsByForm.items)
        setSiblingForms(formsFromAPI.data.formsByForm.items) 
      } 
    }

    async function fetchFields() {
      const fieldsFromAPI = await API.graphql({ 
        query: fieldsByForm, 
        variables: { FormID: formId },
      }); 
      //console.log('fetchFields: formFromAPI', fieldsFromAPI)                     
      setFields(fieldsFromAPI.data.fieldsByForm.items)  
    } 

    async function fetchSubforms() {
      const formsFromAPI = await API.graphql({ 
        query: formsByForm, 
        variables: { FormID: formId },
      });       
      setSubforms(formsFromAPI.data.formsByForm.items)        
      setIncompleteSubforms(formsFromAPI.data.formsByForm.items.filter(form => !form.Subform.isComplete ))
    } 

    async function handlePublishForm() {      
      await API.graphql({ 
                          query: updateFormMutation, 
                          variables: { input: {
                            id: form.id, 
                            isComplete: true,
                          }} 
                        });
      //console.log('handlePublishForm')
      handleNextClick()
    }

    async function handleUnPublishParentForm(e) {
      e.preventDefault()
      if (form.isComplete) {
        await API.graphql({ 
          query: updateFormMutation, 
          variables: { input: {
            id: formId, 
            isComplete: false,
          }} 
        });
        setForm({...form, [form.isComplete]: false});
      }  
      handleBackClick()
    };

    async function handleUnPublishForm( { id, isComplete } ) {     
      //console.log('handleUnPublishForm', id)
      //console.log('handleUnPublishForm', isComplete) 
      if (isComplete) {
        await API.graphql({ 
          query: updateFormMutation, 
          variables: { input: {
            id: id, 
            isComplete: false,
          }} 
        });
        //update this subform in the store
        const newSubforms = subforms.map(subform => {
          if (subform.id === id) {
            const updatedSubform = {
              ...subform,
              isComplete: false,
            };
            return updatedSubform;
          }   
          return subform;
        });
        setSubforms(newSubforms);
      }
    }

    function handleNextClick() {  
      //console.log('handleNextClick: incompleteSubforms', incompleteSubforms)   
      //console.log('handleNextClick: siblingForms', siblingForms)   
      //console.log('handleNextClick: parentFormId', parentFormId)   

      let nextFormId = form.parentFormId
      if (incompleteSubforms.length > 0) {
        //go to the next incomplete subform of this form, if there is one
        nextFormId = incompleteSubforms[0].Subform.id    
        console.log('handleNextClick : incomplete subs : nextFormId:', nextFormId)     
      } else if (siblingForms.length > 0) {
        //go to the next incomplete sibling form
        nextFormId =  siblingForms[0].Subform.id    
        console.log('handleNextClick : incomplete siblings : nextFormId:', nextFormId)     
      }
      
      if (nextFormId === '') {
        history.push("/admin/sevenaforms")
      } else {
        history.push("/admin/formtemplate", { formId: nextFormId })
      }            
    }

    function handleBackClick() {    
      if (parentFormId === '') {
        history.push("/admin/sevenaforms")
      } else {
        history.push("/admin/formtemplate", { formId: parentFormId })
      }
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
                          <p className={classes.cardCategoryWhite}>Form ID: {formId}</p>
                          <p className={classes.cardCategoryWhite}>Parent Form ID: {parentFormId}</p>
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
                          {!form.isComplete ? (<Button color="success" onClick={() => handlePublishForm()}>Publish</Button>) : (<span>This form has been completed <a href="#" onClick={handleUnPublishParentForm}>unpublish</a></span>)}
                          {(incompleteSubforms.length > 0 || siblingForms.length > 0) && (<Button color="info" onClick={handleNextClick}>Next</Button>) }
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
                              <FormControlLabel
                                control={
                                  <Checkbox
                                    checked={subform.Subform.isComplete}
                                    onClick={ () => handleUnPublishForm(subform.Subform) }
                                    checkedIcon={
                                      <Check className={classes.checkedIcon} />
                                    }
                                    icon={<Check className={classes.uncheckedIcon} />}
                                    classes={{
                                      checked: classes.checked,
                                      root: classes.checkRoot
                                    }}
                                  />
                                }
                                classes={{
                                  label: classes.label,
                                  root: classes.labelRoot
                                }}
                                label="Complete"
                              />
                                </TableCell>
                                <TableCell className={tableCellClasses}>{subform.Subform.name}</TableCell>
                                <TableCell className={tableCellClasses}>{subform.Subform.id}</TableCell>
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
