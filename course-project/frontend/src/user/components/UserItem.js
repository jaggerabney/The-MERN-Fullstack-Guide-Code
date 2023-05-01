import React from "react";

import classes from "./UserItem.module.css";

function UserItem(props) {
  return (
    <li className={classes["user-item"]}>
      <div className={classes["user-item__content"]}>
        <div className={classes["user-item__image"]}>
          <img src={props.image} alt={props.name} />
        </div>
        <div className={classes["user-item__info"]}>
          <h2>{props.name}</h2>
          <h3>
            {props.placeCount} {props.placeCount === 1 ? "place" : "places"}
          </h3>
        </div>
      </div>
    </li>
  );
}

export default UserItem;
