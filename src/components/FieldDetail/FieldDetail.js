/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

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
import CustomDropdown from "components/CustomDropdown/CustomDropdown.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

const initialFieldState = { 
    field: '',
    name: '',
    code: '',
    description: '',
    fieldType: 'Text',
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
    size: 6,
}

export default function FieldDetail() {
  const history = useHistory();
  const classes = useStyles();

  const fieldId = history.location.state.fieldId
  const formId = history.location.state.formId
  //console.log('fieldId', fieldId)
  //console.log('formId',formId)

  const [field, setField] = useState(initialFieldState)
  const [optionsDisabled, setOptionsDisabled] = useState(true)
  const [options, setOptions] = useState([])

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
        const apiData = await API.graphql({ query: getField, variables: { id: fieldId  }});       
        const fieldFromAPI = apiData.data.getField
        setField(fieldFromAPI)  

        const fieldType = fieldFromAPI.fieldType
        if (fieldType === 'TrueFalse' || fieldType === 'DropDown') {
            setOptionsDisabled(false)

            const fieldOptions = fieldFromAPI.options
            if (fieldOptions.length > 0) {
              setOptions(fieldOptions.split(','))
            } 
        }        
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
                            size: field.size,
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

  const handleSelectFieldType = event => {
    const {name, value} = event.target;
    console.log('name', name)
    console.log('value', value)
    setField({ ...field, [name]: value})

    //if a type with options, enable that field
    if (value === 'TrueFalse' || value === 'DropDown') { setOptionsDisabled(false) } else { setOptionsDisabled(true)}
    switch(value) {
      case 'TrueFalse':
        setOptionsDisabled(false)
        setOptions(["False", "True"])
      break
      case 'DropDown':
        setOptionsDisabled(false)
        setOptions(["Option 1", "Option 2"])
      break
      default:
        setOptionsDisabled(true)
        setOptions([])
    }
  }

  const handleOptions = regularOptions => {
    setOptions(regularOptions);
    setField({ ...field, options: regularOptions.join(',')})
  };
  
  return (
    <Card>
      <CardHeader color="warning">
        <h4 className={classes.cardTitleWhite}>Field ID: {field.id}</h4>
      </CardHeader>
      <CardBody>
      
      <GridContainer>
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

            <GridItem xs={12} sm={12} md={5}>
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

            <GridItem xs={12} sm={12} md={5}>
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
          

            <GridItem xs={12} sm={12} md={5}>
            <CustomInput
              labelText="Label/Hover"
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

          <GridItem xs={12} sm={12} md={5}>
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
            <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <InputLabel
                htmlFor="field-size"
                className={classes.selectLabel}
              >
                Size
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={field.size}
                onChange={handleSelectFieldType}
                inputProps={{
                  name: "size",
                  id: "field-size"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Select Size
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="2"
                >
                  2
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="3"
                >
                  3
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="4"
                >
                  4
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="5"
                >
                  5
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="6"
                >
                  6
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="7"
                >
                  7
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="9"
                >
                  9
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="10"
                >
                  10
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="12"
                >
                  12
                </MenuItem>                          
              </Select>
            </FormControl>
          </GridItem>
          
          <GridItem xs={12} sm={12} md={5}>
            <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <InputLabel
                htmlFor="field-type"
                className={classes.selectLabel}
              >
                Field Type
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={field.fieldType}
                onChange={handleSelectFieldType}
                inputProps={{
                  name: "fieldType",
                  id: "field-type"
                }}
              >
                <MenuItem
                  disabled
                  classes={{
                    root: classes.selectMenuItem
                  }}
                >
                  Select Field Type
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Text"
                >
                  Text
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="TextArea"
                >
                  TextArea
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Number"
                >
                  Number
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Currency"
                >
                  Currency
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Decimal"
                >
                  Decimal
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Date"
                >
                  Date
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="DateTime"
                >
                  DateTime
                </MenuItem> 
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="DropDown"
                >
                  DropDown
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="TrueFalse"
                >
                  TrueFalse
                </MenuItem>  
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value="Label"
                >
                  Label
                </MenuItem>                          
              </Select>
            </FormControl>
          </GridItem>

          <GridItem xs={12} sm={12} md={5}>
          {!optionsDisabled && (
            <TagsInput
                    value={options}
                    onChange={handleOptions}
                    tagProps={{ className: "react-tagsinput-tag info" }}
                    inputProps={{ placeholder: 'Click to Add'}}
                  />
          )}                  
          </GridItem>
          </GridContainer>
                
        <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <CustomInput
              labelText="Description/Help"
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
