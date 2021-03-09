/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";

//AWS Amplify GraphQL libraries
import { API, graphqlOperation } from 'aws-amplify';
import { listForms } from '../../graphql/queries';

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

// @material-ui/icons

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

export default function SevenAForms() {
    const history = useHistory();
    const classes = useStyles();
    const [forms, setForms] = useState([])
  
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
      fetchForms();
    }, []);
  
    async function fetchForms() {
      const apiData = await API.graphql(graphqlOperation(listForms, {
        filter: { isTopLevel: { eq: true }},
        sort: {
          direction: 'asc',
          field: 'name'
        }
      }));
      const formsFromAPI = apiData.data.listForms.items 
      //console.log(formsFromAPI)
      setForms(formsFromAPI);    
    }
    
    function handleSelectForm({ id }) { 
      history.replace("/admin/formDetail", { formId: id, parentFormId: '', parentFormJoinId: '' })
    }    
  
    function handleCreateForm() {    
      //create a new top level form
      history.replace("/admin/formDetail", { formId: '', parentFormId: '', parentFormJoinId: '' })
    }
  
    function handlePreviewForm({ id }) {    
      history.push("/admin/formtemplate", { formId: id })
    }
    
    return (
        <GridContainer>
      <GridItem xs={12}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>7(a)ware Form List</h4>
        </CardHeader>
        <CardBody>
      
      <GridContainer>
          {
          forms.map(form => (
              <GridItem xs={12} sm={6} md={4} key={form.id}>
                  <Card>
                      <CardHeader color="warning" stats icon>
                      <CardIcon color="warning">
                          <Icon>content_copy</Icon>
                      </CardIcon>
                      <p className={classes.cardCategory}>{form.code}</p>
                      <h3 className={classes.cardTitle}>
                          {form.name}
                      </h3>
                      </CardHeader>
                      <CardBody>
                          <Button color="success" onClick={() => handleSelectForm(form)}>Edit Form</Button>
                          <Button color="info" onClick={() => handlePreviewForm(form)}>Preview</Button>
                      </CardBody>
                      <CardFooter stats>
                        <div className={classes.stats}>
                          Form: {form.id}
                          <br />
                        </div>
                      </CardFooter>
                  </Card>
              </GridItem>
          ))
          }        
        </GridContainer>
        </CardBody>
        <CardFooter>
          <Button 
            onClick={handleCreateForm}
            color="primary"
          >New Form</Button>
        </CardFooter>
        </Card>
        </GridItem>
        </GridContainer>
    );
  }
