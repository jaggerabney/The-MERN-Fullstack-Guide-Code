import React, { useCallback } from "react";

import Input from "../../../shared/components/FormElements/Input/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../../shared/components/util/validators";

import classes from "./NewPlace.module.css";

function NewPlace() {
  const titleInputHandler = useCallback((id, value, isValid) => {});

  return (
    <form className={classes["place-form"]}>
      <Input
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="At least five characters!"
        onInput={titleInputHandler}
      />
    </form>
  );
}

export default NewPlace;
