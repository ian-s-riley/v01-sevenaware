/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { searchForms, getForm, searchFields } from '../../graphql/queries';
import { createForm as createFormMutation, deleteForm as deleteFormMutation, updateForm as updateFormMutation, deleteField as deleteFieldMutation } from '../../graphql/mutations';
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
import { createHashHistory } from 'history';
const useStyles = makeStyles(styles);

const initialFormState = { 
                          form: '',
                          name: '', 
                          code: '', 
                          order: 0, 
                          description: '', 
                          helpCategory: '',
                          helpTitle: '',
                          helpDescription: '',
                          legal: '',
                          parentFormId:  '-1', 
                          parentForm: '',
                          isArray: '',
                          isComplete: '' }

export default function FormDetail() {
  const history = useHistory();
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell);

  const [formId, setFormId] = useState(history.location.state.formId)
  const [newFormParentId, setNewFormParentId] = useState(history.location.state.newFormParentId)
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
    fetchSubforms()
    fetchFields()
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
      if (formId === '') {
          //new form, get the parent form we will use
          setForm({ ...initialFormState, parentFormId: newFormParentId })
      } else {
        console.log('fetchForm: formId', formId)
        const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});       
        setForm(formFromAPI.data.getForm)      
      }
  }  

  async function fetchSubforms() {
    const apiData = await API.graphql(graphqlOperation(searchForms, {
      filter: { parentFormId: { match: formId }},
      sort: {
        direction: 'asc',
        field: 'order'
      }
    }));
    const formsFromAPI = apiData.data.searchForms.items 
    setSubforms(formsFromAPI);  
  }

  async function fetchFields() {
    //const fieldsFromAPI = await API.graphql({ query: listFields, variables: { filter: {formId: {eq: formId}} } });
    //setFields(fieldsFromAPI.data.listFields.items);    
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
    const formFromAPI = apiData.data.createForm
    setNewFormParentId('')
    setFormId(formFromAPI.id)
  }

  async function updateForm() {
    if (!form.name || !form.code) return     
    await API.graphql({ 
                        query: updateFormMutation, 
                        variables: { input: {
                          id: form.id, 
                          form: form.form, 
                          code: form.code,
                          name: form.name, 
                          order: form.order, 
                          description: form.description,
                          helpCategory: form.helpCategory,
                          helpTitle: form.helpTitle,
                          helpDescription: form.helpDescription,
                          legal: form.legal,
                        }} 
                      });  
  }  

  async function handleDeleteSubform({ id }) {
    var result = confirm("Are you sure you want to delete this subform?");
    if (result) {      
      await API.graphql({ query: deleteFormMutation, variables: { input: { id } }});
      const newSubformsArray = subforms.filter(subform => subform.id !== id)
      setSubforms(newSubformsArray)
    }        
  }

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setForm({ ...form, [id]: value})      
  }

  function handleCancel() {
    form.parentFormId === '-1' ? history.push("/admin/sevenaforms") : setFormId(form.parentFormId)
  }  

  async function handleSelectSubform({ id }) { 
    //history.push("/admin/formdetail", { formId: id }) 
    setFormId(id)
  }  

  function handleCreateSubform() {
    setNewFormParentId(formId)
    setFormId('')
  }  

  async function handleSelectField({ id }) { 
    history.push("/admin/fielddetail", { fieldId: id }) 
  }  

  function handleCreateField() {
    history.push("/admin/fielddetail", { fieldId: '', newFieldFormId: formId }) 
  }  

  async function handleDeleteField({ id }) {
    var result = confirm("Are you sure you want to delete this field?");
    if (result) {      
      await API.graphql({ query: deleteFieldMutation, variables: { input: { id } }})
      const newFieldsArray = fields.filter(field => field.id !== id)
      setFields(newFieldsArray)      
    }        
  }

  async function handlePreviewForm({ id }) {
    //console.log('name', name)      
    history.push("/admin/formtemplate", { formId: id })
  }
  
  return (
    <>
    <Card>
      <CardHeader color="primary" stats icon>
        <CardIcon color="primary">
          <Icon>info_outline</Icon>
        </CardIcon>
        <h5 className={classes.cardTitle}>ID: {formId}</h5>
        <p className={classes.cardTitle}>Parent ID: {form.parentFormId}</p>
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
              labelText="Form ID"
              id="form"
              name="form"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: form.form,                
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

          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Legal"
                id="legal"
                name="legal"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: form.legal,
                  multiline: true,
                  rows: 4
                }}
              />
          </GridItem>                             
        </GridContainer>         
      </CardBody>
      <CardFooter>
        <Button onClick={handleCancel}>Done</Button>        
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
                          <TableCell className={tableCellClasses}>Subform</TableCell>
                          <TableCell className={tableCellClasses}>Description</TableCell>
                          <TableCell className={tableCellClasses}>Order</TableCell>
                        </TableRow>
                      {
                        subforms.map(subform => (
                          <TableRow className={classes.tableRow} key={subform.id}>
                            <TableCell className={tableCellClasses}>
                                <>
                                <Button
                                  onClick={() => handlePreviewForm(subform)}
                                  justIcon
                                  color="info"
                                  className={classes.marginRight}
                                >
                                  <Find className={classes.icons} />
                                </Button>
                                <Button
                                  onClick={() => handleSelectSubform(subform)}
                                  justIcon
                                  color="success"
                                  className={classes.marginRight}
                                >
                                  <Check className={classes.icons} />
                                </Button>                                
                                <Button
                                  onClick={() => handleDeleteSubform(subform)}
                                  justIcon
                                  color="danger"
                                  className={classes.marginRight}
                                >
                                  <Cancel className={classes.icons} />
                                </Button>
                                </>
                            </TableCell>                            
                            <TableCell className={tableCellClasses}>{subform.name}</TableCell>
                            <TableCell className={tableCellClasses}>{subform.description}</TableCell>                                                           
                            <TableCell className={tableCellClasses}>{subform.order}</TableCell>
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
                          <TableCell className={tableCellClasses}>
                          <Button
                              onClick={handleCreateField}
                              justIcon
                              color="success"
                            >
                              <Add className={classes.icons} />
                          </Button>
                          </TableCell>
                          <TableCell className={tableCellClasses}>Field Name</TableCell>
                          <TableCell className={tableCellClasses}>Field Type</TableCell>
                          <TableCell className={tableCellClasses}>Order</TableCell>
                        </TableRow>
                      {
                        fields.map(field => (
                          <TableRow className={classes.tableRow} key={field.id}>                            
                            <TableCell className={tableCellClasses}>
                              <Button
                                onClick={() => handleSelectField(field)}
                                justIcon
                                color="success"
                                className={classes.marginRight}
                              >
                                <Check className={classes.icons} />
                              </Button>          
                              <Button
                                  onClick={() => handleDeleteField(field)}
                                  justIcon
                                  color="danger"
                                  className={classes.marginRight}
                                >
                                  <Cancel className={classes.icons} />
                                </Button>                                                                                      
                            </TableCell>
                            <TableCell className={tableCellClasses}>{field.name}</TableCell>
                            <TableCell className={tableCellClasses}>{field.fieldType}</TableCell>                            
                            <TableCell className={tableCellClasses}>{field.order}</TableCell>                          
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
