import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input/Input";
import Button from "../../shared/components/FormElements/Button/Button";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import classes from "./PlaceForm.module.css";
import Card from "../../shared/components/UI/Card/Card";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.74861523068957,
      lng: -73.98524597764153,
    },
    creator: "u1",
  },
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world!",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/800px-Empire_State_Building_%28aerial_view%29.jpg",
    address: "20 W 34th St, New York, NY 10001",
    location: {
      lat: 40.74861523068957,
      lng: -73.98524597764153,
    },
    creator: "u2",
  },
];

function UpdatePlace() {
  const placeId = useParams().placeId;
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    description: {
      value: "",
      isValid: false,
    },
  });

  const placeInfo = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (placeInfo) {
      setFormData(
        {
          title: {
            value: placeInfo.title,
            isValid: true,
          },
          description: {
            value: placeInfo.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormData, placeInfo]);

  if (!placeInfo) {
    return (
      <div className="center">
        <Card>
          <h2>Couldn't find place!</h2>
        </Card>
      </div>
    );
  }

  function submitHandler(event) {
    event.preventDefault();

    console.log(formState.inputs);
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className={classes["place-form"]} onSubmit={submitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title!"
        initValue={formState.inputs.title.value}
        initValid={formState.inputs.title.isValid}
        onInput={inputHandler}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="At least five characters!"
        initValue={formState.inputs.description.value}
        initValid={formState.inputs.description.isValid}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        Update place
      </Button>
    </form>
  );
}

export default UpdatePlace;
