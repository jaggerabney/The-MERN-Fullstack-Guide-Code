import React from "react";

import UserItem from "./UserItem";
import Card from "../../shared/components/UI/Card/Card";

import classes from "./UsersList.module.css";

function UsersList(props) {
  if (props.items.length === 0) {
    return (
      <Card className="center">
        <h2>No users found!</h2>
      </Card>
    );
  }

  return (
    <ul className={classes["users-list"]}>
      {props.items.map((user) => (
        <UserItem
          key={user.id}
          id={user.id}
          name={user.name}
          image={user.image}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
}

export default UsersList;
