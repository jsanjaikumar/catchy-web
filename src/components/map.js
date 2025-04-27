import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "87.3vh",
};

const MyGoogleMap = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const apiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LoadScript googleMapsApiKey={`${apiKey}`}>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
        >
          {/* Show marker at current location */}
          <Marker position={currentPosition} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default MyGoogleMap;
