import React from "react";

import Input from "../../../shared/components/FormElements/Input/Input";

import classes from "./NewPlace.module.css";

import { VALIDATOR_REQUIRE } from "../../../shared/components/util/validators";

function NewPlace() {
  return (
    <form className={classes["place-form"]}>
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
      />
    </form>
  );
}

export default NewPlace;
