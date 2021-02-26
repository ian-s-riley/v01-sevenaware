/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { getField } from '../../graphql/queries';
import { createField as createFieldMutation, deleteField as deleteFieldMutation, updateField as updateFieldMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

const initialFieldState = { 
    fieldId: '',
    field: '',
    name: '',
    code: '',
    description: '',
    fieldType: '',
    order: 0,
    value: '',
    defaultValue: '',
    options: '',
    userId: '',
    lenderId: '',
    label: '',
    helpText: '',
    image: '',
    formId: '',
}

export default function FieldDetail() {
  const history = useHistory();
  const classes = useStyles();

  const fieldId = history.location.state.fieldId
  const formId = history.location.state.formId
  //console.log('fieldId', fieldId)
  //console.log('formId',formId)

  const [field, setField] = useState(initialFieldState)
  //const [forms, setForms] = useState([])  

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
    fetchField()
    //fetchForms()
  }, [fieldId])

  async function fetchField() {
      if (fieldId === '') {
        setField({...initialFieldState, formId: formId})
      } else {
        const fieldFromAPI = await API.graphql({ query: getField, variables: { id: fieldId  }});       
        setField(fieldFromAPI.data.getField)  
      }
  }  

//   async function fetchForms() {
//     //need to hook up many to many relationship
//     const formsFromAPI = await API.graphql({ query: listFields, variables: { filter: {formId: {eq: formId}} } });
//     setFields(formsFromAPI.data.listFields.items);    
//   }

  async function createField() {
    if (!field.name || !field.code) return
    console.log('createField: field', field)
    await API.graphql({ query: createFieldMutation, variables: { input: field } })
    history.goBack()  
  }

  async function updateField() {
    if (!field.name || !field.code) return;        
    await API.graphql({ 
                        query: updateFieldMutation, 
                        variables: { input: {
                            id: field.id, 
                            field: field.field, 
                            name: field.name,
                            code: field.code,
                            description: field.description,
                            fieldType: field.fieldType,
                            order: field.order,
                            value: field.value,
                            defaultValue: field.defaultValue,
                            options: field.options,
                            userId: field.userId,
                            lenderId: field.lenderId,
                            label: field.label,
                            helpText: field.helpText,
                            image: field.image,
                            formId: field.formId,
                        }} 
                    }); 
    //go back to the list or the parent form
    history.goBack()
  }

  async function deleteField({ id }) {
    var result = confirm("Are you sure you want to delete this field?");
    if (result) {      
      await API.graphql({ query: deleteFieldMutation, variables: { input: { id } }});
      history.goBack()
    }        
  }

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setField({ ...field, [id]: value})      
  }

  function handleCancel() {
      history.goBack()   
  }  
  
  return (
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Field ID: {field.id}</h4>
      </CardHeader>
      <CardBody>
      
      <GridContainer>
        

            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="Field Name"
                id="name"
                name="name"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: field.name,                
                }}                           
              />
            </GridItem>

            <GridItem xs={12} sm={12} md={4}>
            <CustomInput
                labelText="Code"
                id="code"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: field.code,                
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
                value: field.order,                
              }}                           
            />
          </GridItem>

            <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Label"
              id="label"
              name="label"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.label,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Default Value"
              id="defaultValue"
              name="defaultValue"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.defaultValue,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText="Field ID"
              id="field"
              name="field"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.field,                
              }}                           
            />
          </GridItem>

            <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Field Type"
              id="fieldType"
              name="fieldType"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.fieldType,                
              }}                           
            />
          </GridItem>

          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Options"
              id="options"
              name="options"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.options,                
              }}                           
            />
          </GridItem>

          </GridContainer>
                
        <GridContainer>
        <GridItem xs={12} sm={12} md={10}>
          <CustomInput
              labelText="Description"
              id="description"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.description,
                multiline: true,
                rows: 3
              }}
            />
          </GridItem>
        </GridContainer>
      </CardBody>
      <CardFooter>
        <Button onClick={handleCancel}>Cancel</Button>        
        {
        fieldId === '' ? (
        <Button 
          onClick={createField}
          color="success"
        >Create New Field</Button>
        ) : (
          <>  
          <Button 
            onClick={updateField}
            color="success"
          >Save</Button>
          <Button color="danger" onClick={() => deleteField(field)}>Delete</Button>
          </>
        )
        }        
      </CardFooter>
    </Card>
  )
}
