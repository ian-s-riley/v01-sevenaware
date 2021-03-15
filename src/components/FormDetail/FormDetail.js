/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import classnames from "classnames";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { getForm, listSubformFormJoins, fieldsByForm, formsByForm, fieldsByLenderId } from '../../graphql/queries';
import { 
  createForm as createFormMutation, 
  createSubformFormJoin as createSubformFormJoinMutation,
  deleteForm as deleteFormMutation, 
  deleteSubformFormJoin as deleteSubformFormJoinMutation,
  updateForm as updateFormMutation,
  updateSubformFormJoin as updateSubformFormJoinMutation,
  createFieldFormJoin as createFieldFormJoinMutation,
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
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

const initialFormState = { 
  name: '',  
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
  isArray: false,
  businessIntelligence: '',  
  userId: '',
  lenderId: '-1',
}

export default function FormDetail() {
  const history = useHistory();
  const classes = useStyles();
  const tableCellClasses = classnames(classes.tableCell);

  const [formId, setFormId] = useState(history.location.state.formId)
  const [parentFormId, setParentFormId] = useState(history.location.state.parentFormId)  
  const [parentFormJoinId, setParentFormJoinId] = useState(history.location.state.parentFormJoinId)  
  const [form, setForm] = useState(initialFormState)
  const [subforms, setSubforms] = useState([])
  const [fields, setFields] = useState([])  
  const [allFields, setAllFields] = useState([])  
  const [order, setOrder] = useState(10)  
  const [newFieldOrder, setNewFieldOrder] = useState(10)  
  const [isDirty, setIsDirty] = useState(false)
  const [fieldSelect, setFieldSelect] = useState("");

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
      //console.log('fetchForm: parentFormId', parentFormId)
      if (formId === '') {
          //new form, get the parent form we will use
          setForm({ ...initialFormState, isTopLevel: parentFormId === '' })
      } else {
        const formFromAPI = await API.graphql({ query: getForm, variables: { id: formId  }});         
        //console.log('fetchForm: formFromAPI', formFromAPI)    
        setForm(formFromAPI.data.getForm)       
        fetchSubforms()  
        fetchFields()     

        //get the order of this form from the form/subform join
        const apiData = await API.graphql(graphqlOperation(listSubformFormJoins, {
          filter: { SubformID: { eq: formId }},
        }));
        (apiData.data.listSubformFormJoins.items.length > 0) 
        ? setOrder(apiData.data.listSubformFormJoins.items[0].order) 
        : setOrder(10)
      }
  } 
  
  async function fetchSubforms() {
    const formsFromAPI = await API.graphql({ 
      query: formsByForm, 
      variables: { FormID: formId },
    }); 
    //console.log('formsFromAPI.data.formsByForm.items',formsFromAPI.data.formsByForm.items)
    setSubforms(formsFromAPI.data.formsByForm.items)  
  } 

  async function fetchFields() {
    const fieldsFromAPI = await API.graphql({ 
      query: fieldsByForm, 
      variables: { FormID: formId },
    }); 
    //console.log('fetchFields: formFromAPI', fieldsFromAPI)                     
    setFields(fieldsFromAPI.data.fieldsByForm.items)  


    const allFieldsFromAPI = await API.graphql({ 
      query: fieldsByLenderId, 
      variables: { lenderId: "-1" },
    }); 
    setAllFields(allFieldsFromAPI.data.fieldsByLenderId.items)
    // console.log('fetchFields: allFieldsFromAPI', allFieldsFromAPI) 
    // if (fieldsFromAPI.data.fieldsByForm.items.length > 0) {
    //   setAllFields(filterByReference(allFieldsFromAPI.data.fieldsByLenderId.items, fieldsFromAPI.data.fieldsByForm.items))  
    // } else {
    //   setAllFields(allFieldsFromAPI.data.fieldsByLenderId.items)
    // }    
  } 

  const filterByReference = (arr1, arr2) => {
    let res = [];
    res = arr1.filter(el => {
       return !arr2.find(element => {
          return element.id === el.id;
       });
    });
    return res;
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
    //console.log('createForm: newFormId', newFormId)

    //if not a top level form, add the subform to form join
    if (parentFormId !== '') {      
      const newFormJoinFromAPI = await API.graphql(graphqlOperation(createSubformFormJoinMutation,{
        input:{
          FormID: parentFormId, 
          SubformID: newFormId,
          order: order
        }
      }))       
      //console.log('createForm: newFormFromAPI', newFormJoinFromAPI.data.createSubformFormJoin.id)
      setParentFormJoinId(newFormJoinFromAPI.data.createSubformFormJoin.id)
    }    
    setIsDirty(false)
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
                        businessIntelligence: form.businessIntelligence,
                        isArray: form.isArray,
                      }} 
                    });  

      //update the order of this subform
      parentFormJoinId !== ''
      &&
      await API.graphql({ 
                        query: updateSubformFormJoinMutation, 
                        variables: { input: {
                        id: parentFormJoinId, 
                        order: order,
                      }} 
      });  
      setIsDirty(false)
  }  

  async function handleDeleteForm() {    
    var result = confirm("Are you sure you want to delete this form?");
    if (result) {      
      if (parentFormId !== '') {
        //get the details for the parent form before we delete the connection
        const apiData = await API.graphql(graphqlOperation(listSubformFormJoins, {
          filter: { SubformID: { eq: parentFormId }},
        }));
        const parentFormsFromAPI = apiData.data.listSubformFormJoins.items        

        //delete the join to the parent form
        await API.graphql({ query: deleteSubformFormJoinMutation, variables: { input: { id: parentFormJoinId } }})
        //delete this form
        await API.graphql({ query: deleteFormMutation, variables: { input: { id: formId } }})

        if (parentFormsFromAPI.length > 0) {
          setParentFormJoinId(parentFormsFromAPI[0].id)
          setParentFormId(parentFormsFromAPI[0].FormID)    
          setFormId(parentFormId)
        } else {
          setParentFormJoinId('')
          setParentFormId('')    
          setFormId(parentFormId)
        }   
      } else {
        //delete this form
        await API.graphql({ query: deleteFormMutation, variables: { input: { id: formId } }})
        //go to the forms page
        history.replace("/admin/sevenaforms")
      }                
    }            
  }

  async function goUp() {
    //console.log('goUp : parentFormId', parentFormId)
    //if a top level form go to forms list else go to parent form
    if (parentFormId === '') {
      history.replace("/admin/sevenaforms")
     } else {
        //get the details for the parent form and go to that form
        const apiData = await API.graphql(graphqlOperation(listSubformFormJoins, {
          filter: { SubformID: { eq: parentFormId }},
        }));        
        const parentFormsFromAPI = apiData.data.listSubformFormJoins.items
        //console.log('goUp: parentFormsFromAPI', parentFormsFromAPI)
        if (parentFormsFromAPI.length > 0) {
          setParentFormJoinId(parentFormsFromAPI[0].id)
          setParentFormId(parentFormsFromAPI[0].FormID)    
          setFormId(parentFormId)
        } else {
          setParentFormJoinId('')
          setParentFormId('')    
          setFormId(parentFormId)
        }        
     } 
  }

  function handleChange(e) {
      const {id, value} = e.currentTarget;
      setIsDirty(true)
      setForm({ ...form, [id]: value})      
  }

  function handleChangeCode(e) {
    const {id, value} = e.currentTarget;
    setIsDirty(true)
    setForm({ ...form, [id]: value.replace(/\s+/g, '-').toLowerCase()})      
  }

  const handleChangeSelect = event => {
    const {name, value} = event.target;
    setIsDirty(true)
    setForm({ ...form, [name]: value})
  }

  function handleChangeOrder(e) {
    const {id, value} = e.currentTarget;
    //console.log('handleChangeOrder : id', id)
    //console.log('handleChangeOrder : value', value)
    setIsDirty(true)
    setOrder(value)
  }

  function handleChangeNewFieldOrder(e) {
    const {id, value} = e.currentTarget;
    setNewFieldOrder(value)
  }


  function handleCreateSubform() {
    setParentFormJoinId('')
    setParentFormId(formId)
    setOrder(10)
    setFormId('')
  } 

  function handleSelectSubform(subformId, nextParentFormJoinId, nextOrder) { 
    //console.log('handleSelectSubform: subformId', subformId)
    //console.log('handleSelectSubform: nextParentFormId', nextParentFormId)
    //console.log('handleSelectSubform: nextParentFormJoinId', nextParentFormJoinId)
    //console.log('handleSelectSubform: nextOrder', nextOrder)
    setOrder(nextOrder)
    setParentFormJoinId(nextParentFormJoinId)    
    setParentFormId(formId)
    setFormId(subformId)
  }    

  function handleSelectField(field) { 
    //console.log('handleSelectField: field', field)
    history.push("/admin/fielddetail", { fieldId: field.FieldID, fieldJoinId: field.id, order: field.order, formId: formId, parentFormId: parentFormId, parentFormJoinId: parentFormJoinId }) 
  }  

  function handleCreateField() {
    history.push("/admin/fielddetail", { fieldId: '', formId: formId, formJoinId: '', order: 10, parentFormId: parentFormId, parentFormJoinId: parentFormJoinId }) 
  }    

  const handleFieldSelect = event => {
      setFieldSelect(event.target.value);
  }

  async function handleAddExistingField() { 
    //console.log('handleAddExistingField: field', fieldSelect)
    if (fieldSelect !== '') {
      //make sure this fields hasn't already been added 



      const fieldJoinFromAPI = await API.graphql(graphqlOperation(createFieldFormJoinMutation,{
        input:{
          FormID: formId, 
          FieldID: fieldSelect,
          order: newFieldOrder,
        }
      }))
      //console.log('handleAddExistingField: fieldJoinFromAPI', fieldJoinFromAPI)
      setNewFieldOrder(10)
      setFieldSelect('')
      setFields([...fields, fieldJoinFromAPI.data.createFieldFormJoin])
    }
  } 

  const saveButton = (
    isDirty ? (
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
    ) : (
      formId === '' ? (
        <Button 
          onClick={createForm}
          color="success"
          disabled
        >Save New Form</Button>
        ) : (
          <Button 
            onClick={updateForm}
            color="success"
            disabled
          >Save</Button>
        )
    )
)

  return (
    <>
    <Card>
      <CardHeader color="primary" stats icon>
        <CardIcon color="primary">
          <Icon>info_outline</Icon>
        </CardIcon>
        <h5 className={classes.cardTitle}>ID: {formId}</h5>
        <p className={classes.cardTitle}>Parent ID: {parentFormId}</p>
        <p className={classes.cardTitle}>Parent Form Join ID: {parentFormId}</p>
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
                onChange: (event) => handleChangeCode(event),
                value: form.code,                
              }}
            />
          </GridItem>        

          <GridItem xs={12} sm={12} md={2}>
          <FormControl
              fullWidth
              className={classes.selectFormControl}
            >
              <InputLabel
                htmlFor="isArray"
                className={classes.selectLabel}
              >
                [0, 1, or Many]
              </InputLabel>
              <Select
                MenuProps={{
                  className: classes.selectMenu
                }}
                classes={{
                  select: classes.select
                }}
                value={form.isArray || false}
                onChange={handleChangeSelect}
                inputProps={{
                  name: "isArray",
                  id: "isArray"
                }}
              >
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={false}
                >
                  No
                </MenuItem>
                <MenuItem
                  classes={{
                    root: classes.selectMenuItem,
                    selected: classes.selectMenuItemSelected
                  }}
                  value={true}
                >
                  Yes
                </MenuItem>                                                          
              </Select>
            </FormControl>
          </GridItem>           

          <GridItem xs={12} sm={12} md={5}>
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
          <GridItem xs={12} sm={12} md={12}>
            <CustomInput
                labelText="Description"
                id="description"
                name="description"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  onChange: (event) => handleChange(event),
                  value: form.description,
                  multiline: true,
                  rows: 2
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
      <CardFooter>
        <Button onClick={goUp}>Done</Button>        
        {saveButton}     
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
                  value: form.businessIntelligence,
                  multiline: true,
                  rows: 4
                }}
              />
          </GridItem>                           
        </GridContainer>            
      </CardBody>            
      </Card>
      <Card>      
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
                              color="info"
                              className={classes.marginRight}
                            >
                              <Add className={classes.icons} />
                            </Button>
                            </TableCell> 
                          <TableCell className={tableCellClasses}>Order</TableCell>
                          <TableCell className={tableCellClasses}>Subform</TableCell>
                          <TableCell className={tableCellClasses}>Join ID</TableCell>                                                 
                        </TableRow>
                      {
                        subforms.map(subform => (
                          <TableRow className={classes.tableRow} key={subform.Subform.id}>
                          <TableCell className={tableCellClasses}>
                                <Button
                                  onClick={() => handleSelectSubform(subform.Subform.id, subform.id, subform.order)}
                                  justIcon
                                  color="success"
                                  className={classes.marginRight}
                                >
                                  <Check className={classes.icons} />
                                </Button>  
                            </TableCell> 
                            <TableCell className={tableCellClasses}>{subform.order}</TableCell>                                                       
                            <TableCell className={tableCellClasses}>{subform.Subform.name}</TableCell>
                            <TableCell className={tableCellClasses}>{subform.id}</TableCell>                                                                                                                   
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
                <CardHeader color="rose" icon>
                      <GridContainer>
                        <GridItem  xs={12} sm={6} md={6}>
                          <CardIcon color="rose">
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
                              color="info"
                            >
                              <Add className={classes.icons} />
                          </Button>
                          </TableCell>
                          <TableCell className={tableCellClasses}>Order</TableCell>
                          <TableCell className={tableCellClasses}>Field Name</TableCell>
                          <TableCell className={tableCellClasses}>Field Type</TableCell>                          
                        </TableRow>
                      {
                        fields.map(field => (
                          <TableRow className={classes.tableRow} key={field.Field.id}>                  
                          <TableCell className={tableCellClasses}>
                              <Button
                                onClick={() => handleSelectField(field)}
                                justIcon
                                color="success"
                                className={classes.marginRight}
                              >
                                <Check className={classes.icons} />
                              </Button>                                                                                              
                            </TableCell>           
                          <TableCell className={tableCellClasses}>{field.order}</TableCell>                                                      
                            <TableCell className={tableCellClasses}>{field.Field.name}</TableCell>
                            <TableCell className={tableCellClasses}>{field.Field.fieldType}</TableCell>                                                                                
                        </TableRow>
                        ))
                      }
                      <TableRow>                          
                        <TableCell className={tableCellClasses}>
                          <Button
                            onClick={handleAddExistingField}
                            justIcon
                            color="rose"
                            >
                            <Add className={classes.icons} />
                          </Button>
                          </TableCell>
                          <TableCell>
                            <CustomInput
                              labelText="Order"
                              id="newFieldOrder"
                              name="newFieldOrder"
                              formControlProps={{
                                fullWidth: true
                              }}
                              inputProps={{
                                onChange: (event) => handleChangeNewFieldOrder(event),
                                value: newFieldOrder,                
                              }}                           
                            />
                          </TableCell>
                          <TableCell className={tableCellClasses} colSpan={2}>
                          <FormControl
                            fullWidth
                            className={classes.selectFormControl}
                            >
                            <InputLabel
                                htmlFor={"Select an Existing Field"}
                                className={classes.selectLabel}
                            >
                                Select an Existing Field
                            </InputLabel>
                            
                            
                            <Select
                              MenuProps={{
                              className: classes.selectMenu
                              }}
                              classes={{
                              select: classes.select
                              }}
                              value={fieldSelect}
                              onChange={handleFieldSelect}
                              inputProps={{
                                  name: 'selectField',
                                  id: 'selectField'
                              }}>
                              <MenuItem
                                  key=''
                                  classes={{
                                      root: classes.selectMenuItem,
                                      selected: classes.selectMenuItemSelected
                                  }}
                                  value=''
                              >Select an Existing Field
                              </MenuItem>    
                              {
                              allFields.map(field => (
                                  <MenuItem
                                      key={field.id}
                                      classes={{
                                          root: classes.selectMenuItem,
                                          selected: classes.selectMenuItemSelected
                                      }}
                                      value={field.id}
                                  >
                                  {field.name}
                                  </MenuItem> 
                              ))
                              }                                                
                            </Select>
                            </FormControl>
                          </TableCell>                        
                        </TableRow>
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
