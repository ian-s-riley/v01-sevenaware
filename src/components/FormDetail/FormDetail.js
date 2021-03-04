/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm } from '../../graphql/customQueries';
import { listSubformFormJoins } from '../../graphql/queries';
import { 
  createForm as createFormMutation, 
  createSubformFormJoin as createSubformFormJoinMutation,
  deleteForm as deleteFormMutation, 
  deleteSubformFormJoin as deleteSubformFormJoinMutation,
  updateForm as updateFormMutation 
} from '../../graphql/mutations';

//import { onCreateField, onUpdateField } from "../../graphql/subscriptions";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TableRow, TableCell } from '@material-ui/core';
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Add from "@material-ui/icons/AddCircle";
import Check from "@material-ui/icons/CheckCircle";
import Cancel from "@material-ui/icons/Cancel";
import Find from "@material-ui/icons/FindInPageRounded";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

const initialFormState = { 
  name: '',  
  order: 10,
	code: '',
  ref: '',	
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
  isTopLevel: true,
}

export default function FormDetail() {
  const history = useHistory();
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell);

  const [formId, setFormId] = useState(history.location.state.formId)
  const [parentFormId, setParentFormId] = useState(history.location.state.parentFormId)  
  const [parentFormJoinId, setParentFormJoinId] = useState()  
  const [form, setForm] = useState(initialFormState)
  const [subforms, setSubforms] = useState([])
  const [fields, setFields] = useState([])  

  useEffect(() => {
    // Specify how to clean up after this effect:
    return function cleanup() {
      // to stop the warning of calling setState of unmounted component
      var id = window.setTimeout(null, 0);
      while (id--) {
        window.clearTimeout(id);
      }
    };
  });

  useEffect(() => {
    fetchForm()    
    fetchParentForm()   
  }, [formId])

  // useEffect(() => {
  //   const fieldSubscription = subscribeCreateField();
  //   return () => fieldSubscription();
  // }, [])

  // useEffect(() => {
  //   const fieldSubscription = subscribeUpdateField();
  //   return () => fieldSubscription();
  // }, [])

  async function fetchForm() {
      //console.log('fetchForm: formId', formId)
      if (formId === '') {
          //new form, get the parent form we will use
          setForm({ ...initialFormState, isTopLevel: parentFormId === '-1' })
      } else {
        const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});              
        setForm(formFromAPI.data.getForm)            
        setSubforms(formFromAPI.data.getForm.Subform.items)  
        setFields(formFromAPI.data.getForm.Field.items)         
      }
  } 
  
  async function fetchParentForm() {    
    if (parentFormId !== '-1' && formId !== '') {        
      //get the parent form connection for navigation & delete
      const apiData = await API.graphql(graphqlOperation(listSubformFormJoins, {
        filter: { SubformID: { eq: formId }},
      }));
      const parentFormsFromAPI = apiData.data.listSubformFormJoins.items
      if (parentFormsFromAPI.length === 0) 
      {
        setParentFormJoinId('')
        setParentFormId('-1')
      } else {
        const parentFormJoinId = parentFormsFromAPI[0].id
        setParentFormJoinId(parentFormJoinId)
        setParentFormId(parentFormsFromAPI[0].FormID)
      }      
    }
} 

  // function subscribeCreateField() {
  //   const subscription = API.graphql(graphqlOperation(onCreateField))
  //     .subscribe({
  //       next: eventData => {
  //         const data = eventData.value.data.onCreateField
  //         console.log('data: ', data)
  //         const newFields = [
  //           ...fields.filter(f => f.id !== data.id),
  //           data
  //         ]
  //         setFields(newFields)
  //       }
  //     })
  //     return () => subscription.unsubscribe();
  // }

  // function subscribeUpdateField() {
  //   console.log('subscribeUpdateField')
  //   const subscription = API.graphql(graphqlOperation(onUpdateField))
  //     .subscribe({
  //       next: eventData => {
  //         const data = eventData.value.data.onUpdateField
  //         console.log('data: ', data)
  //         const newFields = [
  //           ...fields.filter(f => f.id !== data.id),
  //           data
  //         ]
  //         setFields(newFields)
  //       }
  //     })
  //     return () => subscription.unsubscribe();
  // }   

  async function createForm() {    
    if (!form.name || !form.code) return    
    const apiData = await API.graphql({ query: createFormMutation, variables: { input: form } })
    const newFormId = apiData.data.createForm.id

    //if not a top level form, add the subform to form join
    if (parentFormId !== '-1') {
      //console.log('create Subform', formFromAPI.id)
      //console.log('createForm: parent form', parentFormId)
      const newFormJoinFromAPI = await API.graphql(graphqlOperation(createSubformFormJoinMutation,{
        input:{
          FormID: parentFormId, 
          SubformID: newFormId
        }
      }))       
      //console.log('createForm: newFormFromAPI', newFormJoinFromAPI.data.createSubformFormJoin.id)
      setParentFormJoinId(newFormJoinFromAPI.data.createSubformFormJoin.id)
    }    
    setFormId(newFormId)
  }

  async function updateForm() {
    //('updateForm', form)
    if (!form.name || !form.code) return     
    await API.graphql({ 
                        query: updateFormMutation, 
                        variables: { input: {
                        id: form.id, 
                        name: form.name,  
                        order: form.order,
                        code: form.code,
                        ref: form.ref,	
                        image: form.image,
                        description: form.description,
                        helpImage: form.helpImage,
                        helpCategory: form.helpCategory,
                        helpTitle: form.helpTitle,
                        helpDescription: form.helpDescription,
                        legalImage: form.legalImage,
                        legalCategory: form.legalCategory,
                        legalTitle: form.legalTitle,
                        legalDescription: form.legalDescription,
                        dox: form.dox,
                      }} 
                    });  
  }  

  async function handleDeleteForm() {    
    var result = confirm("Are you sure you want to delete this form?");
    if (result) {      
      if (parentFormJoinId !== '') {
        //delete the join to the parent form
        await API.graphql({ query: deleteSubformFormJoinMutation, variables: { input: { id: parentFormJoinId } }})
      }

      //delete this from
      await API.graphql({ query: deleteFormMutation, variables: { input: { id: formId } }})    
      goUp()
    }            
  }

  function goUp() {
    console.log('goUp', parentFormId)
    //if a top level form go to forms list else go to parent form
    if (parentFormId === '-1') {
      history.replace("/admin/sevenaforms")
     } else {
        setParentFormJoinId('')
        setParentFormId('')
        setFormId(parentFormId)
     } 
  }

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setForm({ ...form, [id]: value})      
  }

  function handleCreateSubform() {
    setParentFormJoinId('')
    setParentFormId(formId)
    setFormId('')
  } 

  async function handleSelectSubform({ id }) { 
    setParentFormJoinId('')
    setParentFormId(formId)
    setFormId(id)
  }    

  async function handleSelectField({ id }) { 
    history.push("/admin/fielddetail", { fieldId: id }) 
  }  

  function handleCreateField() {
    history.push("/admin/fielddetail", { fieldId: '', newFieldFormId: formId }) 
  }    

  return (
    <>
    <Card>
      <CardHeader color="primary" stats icon>
        <CardIcon color="primary">
          <Icon>info_outline</Icon>
        </CardIcon>
        <h5 className={classes.cardTitle}>ID: {formId}</h5>
        <p className={classes.cardTitle}>Parent ID: {parentFormId}</p>
        <p className={classes.cardTitle}>Parent From Join ID: {parentFormJoinId}</p>
      </CardHeader>
      <CardBody>
      <GridContainer>                    
          <GridItem xs={12} sm={12} md={5}>
            <CustomInput
              labelText="Form Name"
              id="name"
              name="name"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.name,                
              }}                           
            />
          </GridItem>          
          <GridItem xs={12} sm={12} md={5}>
          <CustomInput
              labelText="Code"
              id="code"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.code,                
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText="Order"
              id="order"
              name="order"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.order,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText="Ref (form id)"
              id="ref"
              name="ref"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.ref,                
              }}                           
            />
          </GridItem>
        </GridContainer>                   
      </CardBody>      
    </Card>

    <Card>
      <CardBody>

      <GridContainer>          
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Help category"
              id="helpCategory"
              name="helpCategory"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.helpCategory,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Help title"
              id="helpTitle"
              name="helpTitle"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.helpTitle,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Help Description"
                id="helpDescription"
                name="helpDescription"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: form.helpDescription,
                  multiline: true,
                  rows: 4
                }}
              />
          </GridItem>                           
        </GridContainer>            
      </CardBody>
      </Card>

    <Card>
      <CardBody>

      <GridContainer>          
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Legal Category"
              id="legalCategory"
              name="legalCategory"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.legalCategory,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Legal Title"
              id="legalTitle"
              name="legalTitle"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.legalTitle,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Legal Description"
                id="legalDescription"
                name="legalDescription"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: form.legalDescription,
                  multiline: true,
                  rows: 4
                }}
              />
          </GridItem>                           
        </GridContainer>            
      </CardBody>      
      </Card>
      <Card>
      <CardFooter>
        <Button onClick={goUp}>Done</Button>        
        {
        formId === '' ? (
        <Button 
          onClick={createForm}
          color="success"
        >Save New Form</Button>
        ) : (
          <Button 
            onClick={updateForm}
            color="success"
          >Save</Button>
        )
        }     
        {formId !== '' 
          && subforms.length == 0 
          && fields.length == 0
          && (
        <Button
          onClick={() => handleDeleteForm()}
          justIcon
          color="danger"
          className={classes.marginRight}
        >
          <Cancel className={classes.icons} />
        </Button>   
        )}           
      </CardFooter>
      </Card>
      {(formId !== '') && (
      <>
      <Card>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="warning" stats icon>
                  <CardIcon color="warning">
                    <h4 className={classes.cardTitleWhite}>Subforms</h4>
                  </CardIcon>                                    
                </CardHeader>
                    <CardBody>
                    <Table className={classes.table}>                    
                      <TableBody>
                        <TableRow>                          
                          <TableCell className={tableCellClasses}>Order</TableCell>
                          <TableCell className={tableCellClasses}>Subform</TableCell>
                          <TableCell className={tableCellClasses}>Description</TableCell>
                          <TableCell className={tableCellClasses}>
                            <Button
                              onClick={handleCreateSubform}
                              justIcon
                              color="success"
                              className={classes.marginRight}
                            >
                              <Add className={classes.icons} />
                            </Button>
                            </TableCell>                        
                        </TableRow>
                      {
                        subforms.map(subform => (
                          <TableRow className={classes.tableRow} key={subform.Subform.id}>
                            <TableCell className={tableCellClasses}>{subform.Subform.order}</TableCell>                                                       
                            <TableCell className={tableCellClasses}>{subform.Subform.name}</TableCell>
                            <TableCell className={tableCellClasses}>{subform.Subform.description}</TableCell>                                                                                       
                            <TableCell className={tableCellClasses}>
                                <Button
                                  onClick={() => handleSelectSubform(subform.Subform)}
                                  justIcon
                                  color="success"
                                  className={classes.marginRight}
                                >
                                  <Check className={classes.icons} />
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
        </CardBody>
      </Card>
      <Card>
        <CardBody>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
                <Card>
                <CardHeader color="info" icon>
                      <GridContainer>
                        <GridItem  xs={12} sm={6} md={6}>
                          <CardIcon color="info">
                            <h4 className={classes.cardTitleWhite}>Fields</h4>
                          </CardIcon>
                        </GridItem>
                        <GridItem  xs={12} sm={6} md={6}>
                        
                        </GridItem>
                      </GridContainer>
                </CardHeader>                     
                    <CardBody>
                    <Table className={classes.table}>                      
                      <TableBody>
                        <TableRow>                          
                          <TableCell className={tableCellClasses}>Order</TableCell>
                          <TableCell className={tableCellClasses}>Field Name</TableCell>
                          <TableCell className={tableCellClasses}>Field Type</TableCell>
                          <TableCell className={tableCellClasses}>Join ID</TableCell>
                          <TableCell className={tableCellClasses}>
                          <Button
                              onClick={handleCreateField}
                              justIcon
                              color="success"
                            >
                              <Add className={classes.icons} />
                          </Button>
                          </TableCell>
                        </TableRow>
                      {
                        fields.map(field => (
                          <TableRow className={classes.tableRow} key={field.Field.id}>                            
                          <TableCell className={tableCellClasses}>{field.Field.order}</TableCell>                                                      
                            <TableCell className={tableCellClasses}>{field.Field.name}</TableCell>
                            <TableCell className={tableCellClasses}>{field.Field.fieldType}</TableCell>    
                            <TableCell className={tableCellClasses}>{field.id}</TableCell> 
                            <TableCell className={tableCellClasses}>
                              <Button
                                onClick={() => handleSelectField(field.Field)}
                                justIcon
                                color="success"
                                className={classes.marginRight}
                              >
                                <Check className={classes.icons} />
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
        </CardBody>
      </Card>
      </>
      )}
      </>
  )
}
