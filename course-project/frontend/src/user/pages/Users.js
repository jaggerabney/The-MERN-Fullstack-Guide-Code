import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UI/Card/Card";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";

function Users() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function sendRequest() {
      setIsLoading(true);

      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message);
        }

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }

      setIsLoading(false);
    }

    sendRequest();
  }, []);

  function errorHandler() {
    setError(null);
  }

  return (
    <div className="center">
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && users.length >= 1 && <UsersList items={users} />}
      {!isLoading && users.length < 1 && (
        <Card className="center">
          <h3>No users found!</h3>
        </Card>
      )}
    </div>
  );
}

export default Users;
