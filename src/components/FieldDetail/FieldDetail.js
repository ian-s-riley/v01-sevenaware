/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

// react component used to create sweet alerts
import SweetAlert from "react-bootstrap-sweetalert";

//AWS Amplify GraphQL libraries
import { API } from 'aws-amplify';
import { getField } from '../../graphql/queries';
import { createField as createFieldMutation, deleteField as deleteFieldMutation, updateField as updateFieldMutation } from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons

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
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

import alertStyles from "assets/jss/material-dashboard-pro-react/views/sweetAlertStyle.js";
const useAlertStyles = makeStyles(alertStyles);

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
  const alertClasses = useAlertStyles();

  const [fieldId, setFieldId] = useState(history.location.state.fieldId)
  const [newFieldFormId, setNewFieldFormId] = useState(history.location.state.newFieldFormId)

  const [field, setField] = useState(initialFieldState)
  const [optionsDisabled, setOptionsDisabled] = useState(true)
  const [options, setOptions] = useState([])
  const [isDirty, setIsDirty] = useState(false)
  const [alert, setAlert] = useState(null);

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
  }, [])

  async function fetchField() {
      if (fieldId === '') {
        setField({...initialFieldState, formId: newFieldFormId})
      } else {
        const apiData = await API.graphql({ query: getField, variables: { id: fieldId  }});       
        const fieldFromAPI = apiData.data.getField
        setField(fieldFromAPI)    
        setupOptions(fieldFromAPI)         
      }
  }  

  function setupOptions(thisField) {
    const fieldType = thisField.fieldType
    if (fieldType === 'DropDown') {
        setOptionsDisabled(false)

        const fieldOptions = thisField.options
        if (fieldOptions.length > 0) {
          setOptions(fieldOptions.split(','))
        } 
    }     
  }

  function handleSaveClick() {
    if (field.id === '') {
      createField()
    } else {
      updateField()
    }
  }

  async function createField() {
    if (!field.name || !field.code) return
    //console.log('createField: field', field)
    const apiData = await API.graphql({ query: createFieldMutation, variables: { input: field } })
    const fieldFromAPI = apiData.data.createField
    setNewFieldFormId('')
    setIsDirty(false)
    setFieldId(fieldFromAPI.id) 
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
    setIsDirty(false)
  }  

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setIsDirty(true)
      setField({ ...field, [id]: value})      
  }

  function handleCancel() {
      history.goBack()   
  }  

  const handleSelectFieldType = event => {
    const {name, value} = event.target;
    setIsDirty(true)
    setField({ ...field, [name]: value})

    //if a type with options, enable that field
    if (value === 'DropDown') { setOptionsDisabled(false) } else { setOptionsDisabled(true)}
  }

  const handleOptions = regularOptions => {
    setIsDirty(true)
    setOptions(regularOptions);
    setField({ ...field, options: regularOptions.join(',')})
  };

  const basicAlert = () => {
    setAlert(
      <SweetAlert
        style={{ display: "block", marginTop: "-100px" }}
        title="Here's a message!"
        onConfirm={() => hideAlert()}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
      />
    );
  };

  const saveButton = (
      isDirty ? (
      <Button 
        onClick={handleSaveClick}
        color="success"
      >{field.id === '' ? 'Create New Field' : 'Save'}</Button>
      ) : (
        <Button 
        onClick={handleSaveClick}
        color="success"
        disabled
      >{field.id === '' ? 'Create New Field' : 'Save'}</Button>
      )
  )
  
  return (
    <Card>
      <CardHeader color="info" stats icon>
        <CardIcon color="info">
          <Icon>info_outline</Icon>
        </CardIcon>
        <h5 className={classes.cardTitle}>ID: {fieldId}</h5>
        <p className={classes.cardTitle}>Parent ID: {field.formId}</p>
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
                  value="YesNo"
                >
                  YesNo
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
            <>
            Options
            <TagsInput
                    value={options}
                    onChange={handleOptions}
                    tagProps={{ className: "react-tagsinput-tag info" }}
                    inputProps={{ placeholder: 'Click to Add'}}
                  />
            </>
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
        <Button onClick={handleCancel}>Done</Button>        
        {saveButton}      
      </CardFooter>
    </Card>
  )
}
