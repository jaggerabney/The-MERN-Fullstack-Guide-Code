import React from "react";

import UserItem from "./UserItem";

import classes from "./UsersList.module.css";

function UsersList(props) {
  return (
    <ul className={classes["users-list"]}>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.places.length}
        />
      ))}
    </ul>
  );
}

export default UsersList;
