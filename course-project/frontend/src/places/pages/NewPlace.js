import React from "react";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import classes from "./PlaceForm.module.css";

function NewPlace() {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function placeSubmitHandler(event) {
    event.preventDefault();

    console.log(formState.inputs);
  }

  return (
    <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="At least five characters!"
        onInput={inputHandler}
      />
      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid address!"
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Add place
      </Button>
    </form>
  );
}

export default NewPlace;
