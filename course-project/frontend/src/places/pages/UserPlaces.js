import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList/PlaceList";
import ErrorModal from "../../shared/components/UI/ErrorModal/ErrorModal";
import LoadingSpinner from "../../shared/components/UI/LoadingSpinner/LoadingSpinner";
import useHttp from "../../shared/hooks/http-hook";

function UserPlaces() {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [places, setPlaces] = useState();
  const userId = useParams().userId;

  useEffect(() => {
    async function fetchPlaces() {
      try {
        const data = await sendRequest(
          `http://localhost:5000/api/places/user/${userId}`
        );

        setPlaces(data.places);
      } catch (error) {
        console.log(error);
      }
    }

    fetchPlaces();
  }, [sendRequest, userId]);

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && places && <PlaceList items={places} />};
    </>
  );
}

export default UserPlaces;
