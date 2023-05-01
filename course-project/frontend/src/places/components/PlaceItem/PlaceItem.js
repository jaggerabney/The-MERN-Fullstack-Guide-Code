import React from "react";

import Card from "../../../shared/components/UI/Card/Card";

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
          <button>View on map</button>
          <button>Edit</button>
          <button>Delete</button>
        </div>
      </Card>
    </li>
  );
}

export default PlaceItem;
