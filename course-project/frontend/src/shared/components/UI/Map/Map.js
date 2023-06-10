import React from "react";
import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api";

import classes from "./Map.module.css";

function Map(props) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
  });

  // eslint-disable-next-line
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerClassName={classes.map}
      center={props.center}
      zoom={props.zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {<MarkerF position={props.center} />}
      <></>
    </GoogleMap>
  ) : (
    <></>
  );
}

export default Map;
