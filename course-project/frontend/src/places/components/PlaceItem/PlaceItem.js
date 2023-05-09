import React, { useContext, useState } from "react";

import Button from "../../../shared/components/FormElements/Button/Button";
import Card from "../../../shared/components/UI/Card/Card";
import Modal from "../../../shared/components/UI/Modal/Modal";
import Map from "../../../shared/components/UI/Map/Map";
import { AuthContext } from "../../../shared/contexts/auth-context";

import classes from "./PlaceItem.module.css";

function PlaceItem(props) {
  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const authContext = useContext(AuthContext);

  function toggleMapHandler() {
    setShowMap(!showMap);
  }

  function toggleShowDeleteModalHandler() {
    setShowDeleteModal(!showDeleteModal);
  }

  function deleteHandler() {
    console.log("Deleting...");

    setShowDeleteModal(false);
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
      <Modal
        show={showDeleteModal}
        onCancel={toggleShowDeleteModalHandler}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button onClick={toggleShowDeleteModalHandler} inverse>
              Cancel
            </Button>
            <Button onClick={deleteHandler} danger>
              Delete
            </Button>
          </>
        }
      >
        <p style={{ margin: "1rem" }}>
          Are you sure you want to delete this place? This action cannot be
          undone!
        </p>
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
            {authContext.isLoggedIn && (
              <>
                <Button to={`/places/${props.id}`}>Edit</Button>
                <Button onClick={toggleShowDeleteModalHandler} danger>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
