import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, fieldsByForm, formsByForm, listSubformFormJoins } from '../../graphql/queries';
import { listArrayFormsAndFields } from '../../graphql/customQueries';
import { 
  updateForm as updateFormMutation,
  createForm as createFormMutation,
  createArrayFormJoin as createArrayFormJoinMutation, 
  createFieldFormJoin as createFieldFormJoinMutation,
  deleteForm as deleteFormMutation,
  deleteArrayFormJoin as deleteArrayFormJoinMutation,
} from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import NavPills from "components/NavPills/NavPills.js";
import Pagination from "components/Pagination/Pagination.js";
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
import Accordion from "components/Accordion/Accordion.js";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import Info from "@material-ui/icons/Info";
import Gavel from "@material-ui/icons/Gavel";
import HelpOutline from "@material-ui/icons/HelpOutline";
import Dashboard from "@material-ui/icons/Dashboard";
import Add from "@material-ui/icons/AddCircle";
import Cancel from "@material-ui/icons/Cancel";
import { TheatersRounded } from '@material-ui/icons';

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
    const [parentFormId, setParentFormId] = useState('')
    const [fields, setFields] = useState([])
    const [subforms, setSubforms] = useState([])
    const [incompleteSubforms, setIncompleteSubforms] = useState([])
    const [siblingForms, setSiblingForms] = useState([])
    const [arrayForms, setArrayForms] = useState([])

    const [showArrayForm, setShowArrayForm] = useState(false)
    const [index, setIndex] = useState("")



    

    useEffect(() => {
      fetchForm()
      fetchFamilyForms()
      fetchSubforms()
      fetchArrayForms()
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
      console.log('fetchFields: formFromAPI', fieldsFromAPI)                     
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

    async function fetchArrayForms() {
      const apiData = await API.graphql(graphqlOperation(listArrayFormsAndFields, {
        filter: { FormID: { eq: formId }},
      }));
      console.log('fetchArrayForms: apiData', apiData.data.listArrayFormJoins.items)
      setArrayForms(apiData.data.listArrayFormJoins.items)        
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
    
    async function createArrayForm() {    
      //add a copy of this form as a sibling
      const newForm = { 
        name: form.name,  
        code: form.code,
        ref: form.ref,	
        image: '',
        description: '',
        helpImage: '',
        helpCategory: '',
        helpTitle: '',
        helpDescription: '',
        legalImage: '',
        legalCategory: '',
        legalTitle: '',
        legalDescription: '',
        dox: '',
        isComplete: false,
        isTopLevel: false,
        isArray: false,
        businessIntelligence: '',  
        userId: form.userId,
        lenderId: form.lenderId,
      }
      console.log('createArrayForm: formId', formId)
      console.log('createArrayForm: newForm', newForm)
    
      const apiData = await API.graphql({ query: createFormMutation, variables: { input: newForm } })
      const newFormId = apiData.data.createForm.id      
      //console.log('createArrayForm: newFormId', newFormId)
      
      const newFormOrder = arrayForms ? arrayForms.length+2 : 0
      //console.log('createArrayForm: arrayForms', newFormOrder)

      const newFormJoinFromAPI = await API.graphql(graphqlOperation(createArrayFormJoinMutation,{
        input:{
          FormID: formId, 
          ArrayFormID: newFormId,
          order: newFormOrder,
        }
      }))                    
      const newFormJoinId = newFormJoinFromAPI.data.createArrayFormJoin.id
      console.log('createForm: newFormJoinId', newFormJoinId)   

      let newField = {
        "Field": {
            "id": fields[0].FieldID,
            "name": fields[0].Field.name,
            "fieldType": "Text",
            "defaultValue": "",
            "description": "",
            "helpText": "",
            "dox": "",
            "code": fields[0].Field.code,
            "image": "",
            "label": "",
            "lenderId": "-1",
            "options": "",
            "ref": "",
            "size": 6,
            "userId": "",
            "value": ""
        },
        "order": newFormOrder,
        "id": newFormJoinId
      }

      console.log('createForm: fields', fields)    
      try
      {  
        fields.map(async(field)=>(
            //await API.graphql(graphqlOperation(getStudent,{id: element.studentID})).then((data)=>console.log(data))
            await API.graphql(graphqlOperation(createFieldFormJoinMutation,{
              input:{
                FormID: newFormId, 
                FieldID: field.FieldID,
                order: field.order,
              }
            })) 
            //console.log('createArrayForm : field', field)
          ))
      } catch(err){ console.log('err',err ) }         
      
      //TODO add the new form and fields to the store
      const newArrayForm = {
        "ArrayFormID": newFormId,
        "id": newFormJoinId,
        "order": 100,
        "FormID": formId,
        "ArrayForm": {
            "Field": {
                "items": [
                  newField
              ]
            }
        }
    }
      setArrayForms([...arrayForms, newArrayForm])
    }

    async function handleDeleteArrayForm(arrayFormId, arrayFormJoinId) {    
      //console.log('handleDeleteArrayForm : arrayFormId', arrayFormId)              
      //console.log('handleDeleteArrayForm : arrayFormJoinId', arrayFormJoinId) 
        
      //delete the join to the parent form
      await API.graphql({ query: deleteArrayFormJoinMutation, variables: { input: { id: arrayFormJoinId } }})
      //delete this form
      await API.graphql({ query: deleteFormMutation, variables: { input: { id: arrayFormId } }})

      //remove the form from the state
      setArrayForms(arrayForms.filter(arrayForm => arrayForm.id !== arrayFormJoinId))      
    }    

    function handleShowArrayForm(index) {    
      setIndex(index)  
      setShowArrayForm(!showArrayForm)
    }

  return (
    !showArrayForm ? (
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
                      <>
                      <Card>
                        <CardHeader color="primary">
                          <h4 className={classes.cardTitleWhite}>{form.name}</h4>
                          <p className={classes.cardCategoryWhite}>{form.description}</p>
                        </CardHeader>
                        <CardBody>
                          {  
                          form.isArray ? (
                            <Table className={classes.table}>                    
                              <TableBody>

                                <TableRow className={classes.tableRow}>                              
                                  <TableCell className={tableCellClasses}>
                                  <Pagination
                                    pages={[
                                      { active: true, text: 1 },
                                    ]}
                                  />
                                  </TableCell>
                                  <TableCell className={tableCellClasses}>{formId}</TableCell>
                                  <TableCell className={tableCellClasses}></TableCell>
                                  <TableCell className={tableCellClasses}>
                                      <Button
                                        onClick={() => handleShowArrayForm(1)}
                                        justIcon
                                        color="success"
                                        className={classes.marginRight}
                                      >
                                        <Check className={classes.icons} />
                                      </Button>  
                                  </TableCell>                                                                     
                                </TableRow>

                                {arrayForms.map((arrayForm, index) => (
                                  <TableRow className={classes.tableRow} key={arrayForm.id}>                              
                                  <TableCell className={tableCellClasses}>
                                    <Pagination
                                      pages={[
                                        { active: true, text: index+2 },
                                      ]}
                                    />
                                  </TableCell>
                                  <TableCell className={tableCellClasses}>{arrayForm.ArrayFormID}</TableCell>                                                                                    
                                  
                                  <TableCell>
                                    <Button
                                      onClick={() => handleDeleteArrayForm(arrayForm.ArrayFormID, arrayForm.id)}
                                      justIcon
                                      color="danger"
                                      className={classes.marginRight}
                                    >
                                      <Cancel className={classes.icons} />
                                    </Button>
                                  </TableCell>
                                  <TableCell className={tableCellClasses}>
                                      <Button
                                        onClick={() => handleShowArrayForm(index+2)}
                                        justIcon
                                        color="success"
                                        className={classes.marginRight}
                                      >
                                        <Check className={classes.icons} />
                                      </Button>  
                                  </TableCell> 
                                </TableRow>
                                ))}
                                
                                <TableRow>                          
                                  <TableCell className={tableCellClasses} colSpan={3}>Add another...</TableCell> 
                                  <TableCell className={tableCellClasses}>
                                    <Button
                                      onClick={createArrayForm}
                                      justIcon
                                      color="info"
                                      className={classes.marginRight}
                                    >
                                      <Add className={classes.icons} />
                                    </Button>
                                  </TableCell>                                                 
                                </TableRow>
                              </TableBody>
                            </Table>
                          ) : (
                            <GridContainer>
                            {
                              fields.map(field => (
                                <SevenAField key={field.Field.id} field={field.Field} />
                              ))
                            }                   
                            </GridContainer>        
                          )}                          
                        </CardBody>
                        <CardFooter>
                          <Button color="info" onClick={handleBackClick}>Back</Button>
                          {!form.isComplete ? (<Button color="success" onClick={() => handlePublishForm()}>Publish</Button>) : (<span>This form has been completed <a href="#" onClick={handleUnPublishParentForm}>unpublish</a></span>)}
                          {(incompleteSubforms.length > 0 || siblingForms.length > 0) && (<Button color="info" onClick={handleNextClick}>Next</Button>) }
                        </CardFooter>
                      </Card>
                      </>
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
    </div>
    ) : (
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
                    tabButton: "Array Form",
                    tabIcon: Dashboard,
                    tabContent: (
                      <>
                      <Card>
                        <CardHeader color="warning">
                          <h4 className={classes.cardTitleWhite}>{form.name} ({index})</h4>
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
                          <Button color="info" onClick={() => handleShowArrayForm("")}>Back</Button>
                          <Button color="success" onClick={() => handleShowArrayForm("")}>Save</Button>
                        </CardFooter>
                      </Card>
                      </>
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
    </div>
    )
  )
}
