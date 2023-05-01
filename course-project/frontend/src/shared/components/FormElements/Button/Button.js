import React from "react";
import { Link } from "react-router-dom";

import classes from "./Button.module.css";

function Button(props) {
  if (props.href) {
    return (
      <a
        className={`${classes.button} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }

  if (props.to) {
    return (
      <Link
        to={props.to}
        exact={props.exact}
        className={`${classes.button} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
      >
        {props.children}
      </Link>
    );
  }

  return (
    <button
      className={`${classes.button} ${
        classes[`button--${props.size || "default"}`]
      } ${props.inverse && classes["button--inverse"]} ${
        props.danger && classes["button--danger"]
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}

export default Button;
