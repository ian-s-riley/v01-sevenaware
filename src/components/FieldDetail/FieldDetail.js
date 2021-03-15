/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

// react component plugin for creating beatiful tags on an input
import TagsInput from "react-tagsinput";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getField, listFieldFormJoins } from '../../graphql/queries';
import { 
  createField as createFieldMutation, 
  createFieldFormJoin as createFieldFormJoinMutation, 
  deleteField as deleteFieldMutation, 
  deleteFieldFormJoin as deleteFieldFormJoinMutation,
  updateField as updateFieldMutation,
  updateFieldFormJoin as updateFieldFormJoinMutation,
} from '../../graphql/mutations';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Cancel from "@material-ui/icons/Cancel";

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

const initialFieldState = { 
    name: '',
    code: '',
    ref: '',
    description: '',
    fieldType: 'Text',	
    value: '',
    defaultValue: '',
    options: '',
    userId: '',
    lenderId: '-1',
    label: '',
    helpText: '',
    image: '',
    dox: '',
    size: 6,
    businessIntelligence: '',
}

export default function FieldDetail() {
  const history = useHistory();
  const classes = useStyles();

  const [fieldId, setFieldId] = useState(history.location.state.fieldId)
  const [fieldJoinId, setFieldJoinId] = useState(history.location.state.fieldJoinId)
  const formId = history.location.state.formId
  const parentFormId = history.location.state.parentFormId
  const parentFormJoinId = history.location.state.parentFormJoinId
  //console.log('fieldId', fieldId)

  const [field, setField] = useState(initialFieldState)
  const [optionsDisabled, setOptionsDisabled] = useState(true)
  const [options, setOptions] = useState([])
  const [order, setOrder] = useState(history.location.state.order)  
  const [isDirty, setIsDirty] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)

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
      console.log('fetchField : fieldId', fieldId)
      if (fieldId !== '') {        
        const apiData = await API.graphql({ query: getField, variables: { id: fieldId  }});       
        const fieldFromAPI = apiData.data.getField
        console.log('fetchField : fieldFromAPI', fieldFromAPI)
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
    //console.log('handle save click - fieldId', fieldId)
    if (fieldId === '') {
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

    //console.log('createField  - fieldFromAPI', fieldFromAPI)
    const fieldJoinFromAPI = await API.graphql(graphqlOperation(createFieldFormJoinMutation,{
      input:{
        FormID: formId, 
        FieldID: fieldFromAPI.id,
        order: order,
      }
    })) 

    // //console.log('formJoinFromAPI', formJoinFromAPI.data.createFieldFormJoin.id)
    setFieldJoinId(fieldJoinFromAPI.data.createFieldFormJoin.id)
    setIsDirty(false)
    setFieldId(fieldFromAPI.id) 
  }

  async function updateField() {
    if (!field.name || !field.code) return;    
    //console.log('udpateField: field', field)
    await API.graphql({ 
                        query: updateFieldMutation, 
                        variables: { input: {
                            id: field.id, 
                            name: field.name,
                            code: field.code,
                            ref: field.ref,
                            description: field.description,
                            fieldType: field.fieldType,	
                            value: field.value,
                            defaultValue: field.defaultValue,
                            options: field.options,
                            label: field.label,
                            helpText: field.helpText,
                            image: field.image,
                            dox: field.dox,
                            size: field.size,
                            businessIntelligence: field.businessIntelligence,
                        }} 
                    }); 
    //update the order of this subform
    fieldJoinId !== ''
    &&
    await API.graphql({ 
        query: updateFieldFormJoinMutation, 
        variables: { input: {
        id: fieldJoinId, 
        order: order,
      }} 
    });      
    setIsDirty(false)
  }  

  async function handleDeleteField() {
    // console.log('delete - form join id', field.Form.items[0].id)     
    var result = confirm("Are you sure you want to delete this field?");
    if (result) {                
      await API.graphql({ query: deleteFieldFormJoinMutation, variables: { input: { id: fieldJoinId } }})

      //delete if not on any other forms
      const apiData = await API.graphql(graphqlOperation(listFieldFormJoins, {
        filter: {FieldID: {eq: fieldId}, id: {ne: fieldJoinId}},
      }))
      //console.log('handleDeleteField : apiData', apiData)
      if (apiData.data.listFieldFormJoins.items.length === 0) {
        await API.graphql({ query: deleteFieldMutation, variables: { input: { id: fieldId } }})                         
      } 
      setIsDeleted(true)         
    }        
  }

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setIsDirty(true)
      setField({ ...field, [id]: value})      
  }

  function handleChangeCode(e) {
    const {id, value} = e.currentTarget;
    setIsDirty(true)
    setField({ ...field, [id]: value.replace(/\s+/g, '-').toLowerCase()})      
  }

  //str = str;

  function handleChangeOrder(e) {
    const {id, value} = e.currentTarget;
    setIsDirty(true)
    setOrder(value)
  }

  function goToForm() {
      history.push("/admin/formdetail", { formId: formId, parentFormId: parentFormId, parentFormJoinId: parentFormJoinId })   
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

  const saveButton = (
      isDirty ? (
      <Button 
        onClick={handleSaveClick}
        color="success"
      >{fieldId === '' ? 'Create New Field' : 'Save'}</Button>
      ) : (
        <Button 
        onClick={handleSaveClick}
        color="success"
        disabled
      >{fieldId === '' ? 'Create New Field' : 'Save'}</Button>
      )
  )
  
  return (
    isDeleted ? (
      <Card>
      <CardHeader color="info" stats icon>
      <CardIcon color="info">
        <Icon>info_outline</Icon>
      </CardIcon>
      <h5 className={classes.cardTitle}>This field has been removed from the form.</h5>
      <p className={classes.cardTitle}>If it was not linked to any other forms it has been deleted completely.</p>
    </CardHeader>
      <CardFooter>
        <Button onClick={goToForm}>Done</Button>        
      </CardFooter>
    </Card>
    ) : (      
      <>
    <Card>
      <CardHeader color="info" stats icon>
        <CardIcon color="info">
          <Icon>info_outline</Icon>
        </CardIcon>
        <h5 className={classes.cardTitle}>Field ID: {fieldId}</h5>
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
                onChange: (event) => handleChangeOrder(event),
                value: order,                
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
                  onChange: (event) => handleChangeCode(event),
                  value: field.code,                
                }}
              />
            </GridItem>

            
            <GridItem xs={12} sm={12} md={2}>
            <CustomInput
              labelText="Ref (field id)"
              id="ref"
              name="ref"
              formControlProps={{
                fullWidth: true
              }}
              inputProps={{
                onChange: (event) => handleChange(event),
                value: field.ref,                
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
                  value="8"
                >
                  8
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
                  value="Email"
                >
                  Email
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
        <Button onClick={goToForm}>Done</Button>        
        {saveButton}     
        {fieldId !== '' && (
        <Button
          onClick={handleDeleteField}
          justIcon
          color="danger"
          className={classes.marginRight}
        >
          <Cancel className={classes.icons} />
        </Button>   
        )}
      </CardFooter>
    </Card>
    <Card>
      <CardBody>

      <GridContainer>                    
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Business Intelligence"
                id="businessIntelligence"
                name="businessIntelligence"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: field.businessIntelligence,
                  multiline: true,
                  rows: 4
                }}
              />
          </GridItem>                           
        </GridContainer>            
      </CardBody>      
      </Card>
      </>
    )
  )
}
