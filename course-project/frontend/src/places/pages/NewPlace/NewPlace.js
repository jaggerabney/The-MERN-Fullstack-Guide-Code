import React from "react";

import Input from "../../../shared/components/FormElements/Input/Input";

import classes from "./NewPlace.module.css";

function NewPlace() {
  return (
    <form className={classes["place-form"]}>
      <Input
        element="input"
        type="text"
        label="Title"
        errorText="Please enter a valid title!"
      />
    </form>
  );
}

export default NewPlace;
