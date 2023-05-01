import React from "react";

import UsersList from "../components/UsersList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Jagger Abney",
      image: "https://avatars.githubusercontent.com/u/63568996?v=4",
      places: 3,
    },
  ];

  return <UsersList items={USERS} />;
}

export default Users;
