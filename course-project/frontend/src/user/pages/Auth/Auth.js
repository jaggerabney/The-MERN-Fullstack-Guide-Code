import React, { useContext, useState } from "react";

import Card from "../../../shared/components/UI/Card/Card";
import Input from "../../../shared/components/FormElements/Input/Input";
import Button from "../../../shared/components/FormElements/Button/Button";
import ErrorModal from "../../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../../shared/util/validators";
import useForm from "../../../shared/hooks/form-hook";
import { AuthContext } from "../../../shared/contexts/auth-context";

import classes from "./Auth.module.css";

function Auth() {
  const authContext = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false
      },
      password: {
        value: "",
        isValid: false
      }
    },
    false
  );

  async function submitHandler(event) {
    event.preventDefault();
    setIsLoading(true);

    if (isLoginMode) {
      try {
        const response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value
          })
        });

        const resData = await response.json();
        console.log(resData.message);

        if (!response.ok) {
          throw new Error(resData.message);
        }

        setIsLoading(false);
        authContext.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "An error occurred!");

        console.log(error);
      }
    } else {
      try {
        const response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            image:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png"
          })
        });

        const resData = await response.json();

        if (!resData.ok) {
          throw new Error(resData.message);
        }

        setIsLoading(false);
        authContext.login();
      } catch (error) {
        setIsLoading(false);
        setError(error.message || "An error occurred!");

        console.log(error);
      }
    }
  }

  function switchAuthModeHandler() {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false
          }
        },
        false
      );
    }

    setIsLoginMode((prevState) => !prevState);
  }

  function errorHandler() {
    setError(null);
  }

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className={classes.authentication}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>{isLoginMode ? "Login" : "Sign up"}</h2>
        <hr />
        <form onSubmit={submitHandler}>
          {!isLoginMode && (
            <Input
              id="name"
              element="input"
              type="text"
              label="Name"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Please enter your name!"
              onInput={inputHandler}
            />
          )}
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
            {isLoginMode ? "Login" : "Sign up"}
          </Button>
        </form>
        <p>
          {isLoginMode
            ? "Don't have an account? "
            : "Already have an account? "}

          <span onClick={switchAuthModeHandler} className={classes.link}>
            {isLoginMode ? "Sign up!" : "Login!"}
          </span>
        </p>
      </Card>
    </>
  );
}

export default Auth;
