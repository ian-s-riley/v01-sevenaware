/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { searchForms, getForm, searchFields } from '../../graphql/queries';
import { createForm as createFormMutation, deleteForm as deleteFormMutation, updateForm as updateFormMutation, deleteField as deleteFieldMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import { TableRow, TableCell } from '@material-ui/core';

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
                          code: '', 
                          order: 0, 
                          description: '', 
                          helpCategory: '',
                          helpTitle: '',
                          helpDescription: '',
                          legal: '',
                          parentFormId:  '-1', 
                          isArray: '',
                          isComplete: '' }

export default function FormDetail() {
  const history = useHistory();
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell);

  const formId = history.location.state.formId
  const parentFormId = history.location.state.parentFormId
  //onsole.log('formId', formId)
  //console.log('parentFormID',parentFormId)

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

  async function fetchForm() {
      if (formId === '') {
          setForm({ ...initialFormState, parentFormId: parentFormId})
      } else {
        const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});       
        setForm(formFromAPI.data.getForm )      
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

  async function createForm() {
    if (!form.name || !form.code) return    
    await API.graphql({ query: createFormMutation, variables: { input: form } })
    history.goBack()  
  }

  async function updateForm() {
    if (!form.name || !form.code) return;       
    await API.graphql({ 
                        query: updateFormMutation, 
                        variables: { input: {
                          id: form.id, 
                          code: form.code,
                          name: form.name, 
                          order: form.order, 
                          description: form.description,
                          helpCategory: form.helpCategory,
                          helpTitle: form.helpTitle,
                          helpDescription: form.helpDescription,
                          legal: form.legal,
                          parentFormId: form.parentFormId,
                        }} 
                      });
    //go back to the list or the parent form
    history.goBack()
  }

  async function handleDeleteForm({ id }) {
    var result = confirm("Are you sure you want to delete this form?");
    if (result) {      
      await API.graphql({ query: deleteFormMutation, variables: { input: { id } }});
      history.goBack()
    }        
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
      history.goBack()   
  }  

  async function handleSelectSubform({ id, parentFormId }) { 
    history.push("/admin/formdetail", { formId: id, parentFormId: parentFormId }) 
  }  

  function handleCreateSubform() {
    history.push("/admin/formdetail", { formId: '', parentFormId: formId }) 
  }  

  async function handleSelectField({ id }) { 
    history.push("/admin/fielddetail", { fieldId: id, formId: formId }) 
  }  

  function handleCreateField() {
    history.push("/admin/fielddetail", { fieldId: '', formId: formId }) 
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
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Form ID: {form.id}</h4>
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

          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Description"
                id="description"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: form.description,
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
        <Button onClick={handleCancel}>Cancel</Button>        
        {
        formId === '' ? (
        <Button 
          onClick={createForm}
          color="success"
        >Save New Form</Button>
        ) : (
          <>
          <Button 
            onClick={updateForm}
            color="success"
          >Save</Button>
          <Button color="info" onClick={() => handlePreviewForm(form)}>Preview</Button>
          <Button color="danger" onClick={() => handleDeleteForm(form)}>Delete</Button>
          </>
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
