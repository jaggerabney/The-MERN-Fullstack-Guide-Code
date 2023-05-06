import React, { useState } from "react";

import Card from "../../../shared/components/UI/Card/Card";
import Button from "../../../shared/components/FormElements/Button/Button";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Map from "../../../shared/components/UI/Map/Map";

import classes from "./PlaceItem.module.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);

  function toggleMapHandler() {
    setShowMap(!showMap);
  }

  return (
    <>
      <Modal
        show={showMap}
        onCancel={toggleMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={toggleMapHandler}>Close</Button>}
      >
        <div className={classes["map-container"]}>
          <Map center={props.coordinates} zoom={16} />
        </div>
      </Modal>
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
            <Button onClick={toggleMapHandler} inverse>
              View on map
            </Button>
            <Button to={`/places/${props.id}`}>Edit</Button>
            <Button danger>Delete</Button>
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
