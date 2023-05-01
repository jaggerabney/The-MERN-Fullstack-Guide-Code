import React from "react";

import Card from "../../../shared/components/UI/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";

import classes from "./PlaceItem.module.css";

function PlaceItem(props) {
  return (
    <li className={classes["place-item"]}>
      <Card className={classes["place-item__content"]}>
        <div className={classes["place-item__image"]}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes["place-item__info"]}>
          <h2>{props.title}</h2>
          <h3>{props.address}</h3>
          <p>{props.description}</p>
        </div>
        <div className={classes["place-item__actions"]}>
          <Button inverse>View on map</Button>
          <Button to={`/places/${props.id}`}>Edit</Button>
          <Button danger>Delete</Button>
        </div>
      </Card>
    </li>
  );
}

export default PlaceItem;
