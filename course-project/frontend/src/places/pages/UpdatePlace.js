import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import useForm from "../../shared/hooks/form-hook";
import useHttp from "../../shared/hooks/http-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from "../../shared/util/validators";
import { AuthContext } from "../../shared/contexts/auth-context";

import classes from "./PlaceForm.module.css";
import Card from "../../shared/components/UI/Card/Card";

function UpdatePlace() {
  const history = useHistory();
  const placeId = useParams().placeId;
  const authContext = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [place, setPlace] = useState();

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: "",
      isValid: false
    },
    description: {
      value: "",
      isValid: false
    }
  });

  useEffect(() => {
    async function fetchPlace() {
      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
        );

        setPlace(data.place);
        setFormData(
          {
            title: {
              value: data.place.title,
              isValid: true
            },
            description: {
              value: data.place.description,
              isValid: true
            }
          },
          true
        );
      } catch (error) {
        console.log(error);
      }
    }

    fetchPlace();
  }, [setFormData, sendRequest, placeId]);

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!place && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find place!</h2>
        </Card>
      </div>
    );
  }

  async function submitHandler(event) {
    event.preventDefault();

    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value
        }),
        {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authContext.token}`
        }
      );
    } catch (error) {
      console.log(error);
    }

    history.push(`/${authContext.userId}/places`);
  }

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && place && (
        <form className={classes["place-form"]} onSubmit={submitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title!"
            initValue={place.title}
            initValid={true}
            onInput={inputHandler}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="At least five characters!"
            initValue={place.description}
            initValid={true}
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Update place
          </Button>
        </form>
      )}
    </>
  );
}

export default UpdatePlace;
