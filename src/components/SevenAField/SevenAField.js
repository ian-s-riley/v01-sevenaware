/*eslint-disable*/
import React, { useState } from "react";

// react component plugin for creating a beautiful datetime dropdown picker
import Datetime from "react-datetime";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Switch from "@material-ui/core/Switch";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

// material ui icons
import Close from "@material-ui/icons/Close";

import styles from "assets/jss/material-dashboard-pro-react/views/extendedFormsStyle.js";
const useStyles = makeStyles(styles);

export default function SevenAField(props) {  
    const classes = useStyles();

    const field = props.field 
    const size = field.size  
    const options = field.options.split(',')

    const [email, setEmail] = useState("");
    const [emailState, setEmailState] = useState("")

    const [number, setNumber] = useState("")
    const [numberState, setNumberState] = useState("")

    const [currency, setCurrency] = useState("")
    const [currencyState, setCurrencyState] = useState("")

    const [decimal, setDecimal] = useState("")
    const [decimalState, setDecimalState] = useState("")

    const [yes, setYes] = useState(true);
    const [simpleSelect, setSimpleSelect] = useState("");
    

    // function that returns true if value is email, false otherwise
    const verifyEmail = value => {
        var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRex.test(value)) {
        return true;
        }
        return false;
    };

    // function that verifies if value contains only numbers
    const verifyNumber = value => {
        var numberRex = new RegExp("^[0-9]+$");
        if (numberRex.test(value)) {
        return true;
        }
        return false;
    };

    // function that verifies if value contains only currency values
    const verifyCurrency = value => {
        var numberRex = new RegExp("^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*\.[0-9]{2}$");
        if (numberRex.test(value)) {
        return true;
        }
        return false;
    };

    // function that verifies if value contains only currency values
    const verifyDecimal = value => {
        var numberRex = new RegExp("^[1-9][\.\d]*(,\d+)?$");
        if (numberRex.test(value)) {
        return true;
        }
        return false;
    };    

    const handleSimple = event => {
        setSimpleSelect(event.target.value);
    };

    let thisField = null  
    switch (field.fieldType) {        
        case 'Email':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                  <CustomInput
                    labelText={field.name}
                    success={emailState === "success"}
                    error={emailState === "error"}
                    id={field.id}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      onChange: event => {
                        if (verifyEmail(event.target.value)) {
                          setEmailState("success");
                        } else {
                          setEmailState("error");
                        }
                        setEmail(event.target.value);
                      },
                      type: "email",
                      endAdornment:
                        emailState === "error" ? (
                          <InputAdornment position="end">
                            <Close className={classes.danger} />
                          </InputAdornment>
                        ) : (
                          undefined
                        )
                    }}
                  />
                </GridItem>
            )
            break
        case 'TextArea':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                  <CustomInput
                    labelText={field.name}
                    id={field.id}
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      multiline: true,
                      rows: 2
                    }}
                  />
                </GridItem>
            ) 
            break;
        case 'Number':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <CustomInput
                        labelText={field.name}
                        success={numberState === "success"}
                        error={numberState === "error"}
                        id={field.id}
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                        onChange: event => {
                            if (verifyNumber(event.target.value)) {
                            setNumberState("success");
                            } else {
                            setNumberState("error");
                            }
                            setNumber(event.target.value);
                        },
                        endAdornment:
                            numberState === "error" ? (
                            <InputAdornment position="end">
                                <Close className={classes.danger} />
                            </InputAdornment>
                            ) : (
                            undefined
                            )
                        }}
                    />
                  </GridItem>
            )
            break;
        case 'Currency':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <CustomInput
                        labelText={field.name}
                        success={currencyState === "success"}
                        error={currencyState === "error"}
                        id={field.id}
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                        onChange: event => {
                            if (verifyCurrency(event.target.value)) {
                            setCurrencyState("success");
                            } else {
                            setCurrencyState("error");
                            }
                            setCurrency(event.target.value);
                        },
                        endAdornment:
                            currencyState === "error" ? (
                            <InputAdornment position="end">
                                <Close className={classes.danger} />
                            </InputAdornment>
                            ) : (
                            undefined
                            )
                        }}
                    />
                    </GridItem>
            )
            break;
        case 'Decimal':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <CustomInput
                        labelText={field.name}
                        success={currencyState === "success"}
                        error={currencyState === "error"}
                        id={field.id}
                        formControlProps={{
                        fullWidth: true
                        }}
                        inputProps={{
                        onChange: event => {
                            if (verifyDecimal(event.target.value)) {
                                setDecimalState("success");
                            } else {
                                setDecimalState("error");
                            }
                            setDecimal(event.target.value);
                        },
                        endAdornment:
                            decimalState === "error" ? (
                            <InputAdornment position="end">
                                <Close className={classes.danger} />
                            </InputAdornment>
                            ) : (
                            undefined
                            )
                        }}
                    />
                    </GridItem>
            )
            break;
        case 'Date':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <InputLabel className={classes.label}>{field.name}</InputLabel>
                    <br />
                    <FormControl fullWidth>
                        <Datetime
                            timeFormat={false}
                            inputProps={{ placeholder: "Select Date" }}
                        />
                    </FormControl>
                </GridItem>
            )
            break;
        case 'DateTime':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <InputLabel className={classes.label}>{field.name}</InputLabel>
                    <br />
                    <FormControl fullWidth>
                        <Datetime
                            timeFormat={true}
                            inputProps={{ placeholder: "Select Date & Time" }}
                        />
                    </FormControl>
                </GridItem>
            )
            break;
        case 'YesNo':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <InputLabel className={classes.label}>{field.name}</InputLabel>
                    <br />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={yes}
                          onChange={event => setYes(event.target.checked)}
                          value={field.name}
                          classes={{
                            switchBase: classes.switchBase,
                            checked: classes.switchChecked,
                            thumb: classes.switchIcon,
                            track: classes.switchBar
                          }}
                        />
                      }
                      classes={{
                        label: classes.label
                      }}
                    />
                </GridItem>
            )
            break;
        case 'DropDown':
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <FormControl
                    fullWidth
                    className={classes.selectFormControl}
                    >
                    <InputLabel
                        htmlFor={field.id}
                        className={classes.selectLabel}
                    >
                        {field.name}
                    </InputLabel>
                    <Select
                        MenuProps={{
                        className: classes.selectMenu
                        }}
                        classes={{
                        select: classes.select
                        }}
                        value={simpleSelect}
                        onChange={handleSimple}
                        inputProps={{
                            name: field.name,
                            id: field.id
                        }}
                    >
                        <MenuItem
                        disabled
                        classes={{
                            root: classes.selectMenuItem
                        }}
                        >
                        Select {field.name}
                        </MenuItem>
                        {
                        options.map(option => (
                            <MenuItem
                                key={option}
                                classes={{
                                    root: classes.selectMenuItem,
                                    selected: classes.selectMenuItemSelected
                                }}
                                value={option}
                            >
                            {option}
                            </MenuItem> 
                        ))
                        }                                                    
                    </Select>
                    </FormControl>
                </GridItem>
            )
            break
        default:
            thisField = (
                <GridItem xs={12} sm={12} md={size}>
                    <CustomInput
                    labelText={field.name}        
                    id={field.id}
                    formControlProps={{
                        fullWidth: true
                    }}
                    inputProps={{
                        disabled: field.disabled,
                        value: field.defaultValue
                    }}
                    />
                </GridItem>
            )
    }

  return thisField
}

