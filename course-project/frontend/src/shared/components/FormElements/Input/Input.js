import React, { useReducer } from "react";

import classes from "./Input.module.css";

function inputReducer(state, action) {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.value,
        isValid: true,
      };
    default:
      return state;
  }
}

function Input(props) {
  const [inputState, dispatchInput] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  function changeHandler(event) {
    dispatchInput({
      type: "CHANGE",
      value: event.target.value,
    });
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`${classes["form-control"]} ${
        !inputState.isValid && classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && <p>{props.errorText}</p>}
    </div>
  );
}

export default Input;
