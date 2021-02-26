/*eslint-disable*/
import React, { Component } from "react";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";

// nodejs library to set properties for components
import PropTypes from "prop-types";

export default function Field(props) {
  
  return (
    <GridItem xs={12} sm={12} md={props.md}>
        <CustomInput
        labelText={props.name}        
        id={props.id}
        inputProps={{value: props.value}}
        formControlProps={{
            fullWidth: true
        }}
        inputProps={{
            disabled: props.disabled
        }}
        />
    </GridItem>
  );
}

Field.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  description: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  md: PropTypes.number
};
