import React, { useEffect, useState } from "react";

import Card from "../../shared/components/UI/Card/Card";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../shared/hooks/http-hook";

function Users() {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      console.log(`${process.env.REACT_APP_BACKEND_URL}/users`);

      try {
        const data = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/users`
        );

        setUsers(data.users);
      } catch (error) {
        console.log(error);
      }
    }

    fetchUsers();
  }, [sendRequest]);

  return (
    <div className="center">
      <ErrorModal error={error} onClear={clearError} />
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
