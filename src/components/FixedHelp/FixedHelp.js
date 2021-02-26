/*eslint-disable*/
import React, { Component } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

export default function FixedHelp(props) {  
  const handleClick = () => {
    props.handleFixedClick();
  };

  return (
    <div
      className={classnames("fixed-plugin")}
    >
      <div id="fixedPluginClasses" className={props.fixedClasses}>
        <div onClick={handleClick}>
          <i className="fa fa-cog fa-2x" />
        </div>
        <ul className="dropdown-menu">
          <li className="header-title">Legalese</li>

          <li className="button-container">
            <div className="button-container">
              {props.legal}
            </div>
          </li>
          <li className="adjustments-line" />
        </ul>
      </div>
    </div>
  );
}

FixedHelp.propTypes = {
  legal: PropTypes.string,
  handleFixedClick: PropTypes.func,
  fixedClasses: PropTypes.string,
};
