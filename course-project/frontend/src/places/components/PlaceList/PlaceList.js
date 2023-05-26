import React from "react";

import Card from "../../../shared/components/UI/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import PlaceItem from "../PlaceItem/PlaceItem";

import classes from "./PlaceList.module.css";

function PlaceList(props) {
  if (props.items.length === 0) {
    return (
      <Card className={`${classes["place-list"]} center`}>
        <h2>No places found. Maybe create one?</h2>
        <Button to="/places/new">Share place</Button>
      </Card>
    );
  }

  return (
    <ul className={classes["place-list"]}>
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.image}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
          onDelete={props.onDelete}
        />
      ))}
    </ul>
  );
}

export default PlaceList;
