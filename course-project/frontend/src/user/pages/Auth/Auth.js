import React from "react";

import Card from "../../../shared/components/UI/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../../shared/util/validators";
import useForm from "../../../shared/hooks/form-hook";

import classes from "./Auth.module.css";

function Auth() {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  function submitHandler(event) {
    event.preventDefault();

    console.log(formState.inputs);
  }

  return (
    <Card className={classes.authentication}>
      <h2>Login</h2>
      <hr />
      <form onSubmit={submitHandler}>
        <Input
          id="email"
          element="input"
          type="email"
          label="Email"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address!"
          onInput={inputHandler}
        />
        <Input
          id="password"
          element="input"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password!"
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
    </Card>
  );
}

export default Auth;
