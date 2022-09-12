import { GoogleMap, Marker, StandaloneSearchBox } from "@react-google-maps/api";
import html2canvas from "html2canvas";
import { useEffect, useState } from "react";
import { Button } from "../Components/Button";
import { getCurrentLocation } from "../utils/common_function";
import "./GoogleMap.css";
const GoogleMapComponent = (props) => {
  const [search, setSearch] = useState();
  const [showMarker, setShowMarkers] = useState(false);
  const [defaultOptions, setDefaultOptions] = useState({
    fullscreenControl: false,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
  });
  const [currentLocation, setCurrentLocation] = useState({
    lat: 0,
    lng: 0,
  });
  const [center, setCenter] = useState({
    lat: 0,
    lng: 0,
  });

  const { setImage } = props;
  const inputBoxStyle = {
    border: `0px solid transparent`,
    outlineColor: "transparent",
    width: `700px`,
    height: `40px`,
    padding: `0 8px`,
    borderRadius: `3px`,
    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
    marginBottom: "16px",
  };

  const handleDownloadImage = async () => {
    const element = document.getElementById("map-element"),
      canvas = await html2canvas(element, { useCORS: true }),
      data = canvas.toDataURL("image/jpg");
    setImage(data);
  };

  const onLoad = (ref) => {
    setSearch(ref);
  };

  const toogleMapControls = () => {
    let val = !defaultOptions.fullscreenControl;
    setDefaultOptions({
      fullscreenControl: val,
      zoomControl: val,
      streetViewControl: val,
      mapTypeControl: val,
    });
  };
  const toogleShowMarker = () => {
    setShowMarkers(!showMarker);
  };
  const onPlacesChanged = () => {
    const places = search.getPlaces();
    if (places.length) {
      changeCurrentLocation({
        lat: places[0].geometry.location.lat(),
        lng: places[0].geometry.location.lng(),
      });
    }
  };

  useEffect(() => {
    getCurrentLocation(changeCurrentLocation);
  }, []);

  const changeCurrentLocation = (
    val = { lat: 0, lng: 0 },
    changeCenter = true
  ) => {
    setCurrentLocation(val);
    if (changeCenter) {
      setCenter(val);
    }
  };

  return (
    <div>
      <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
        <input placeholder="Search For Places" style={inputBoxStyle}></input>
      </StandaloneSearchBox>

      <div id="map-element">
        <GoogleMap
          zoom={14}
          center={center}
          mapContainerClassName="map-container"
          options={defaultOptions}
          onClick={(e) => {
            changeCurrentLocation(
              {
                lat: +e.latLng.lat(),
                lng: +e.latLng.lng(),
              },
              false
            );
          }}
        >
          <Marker
            visible={showMarker}
            animation={window.google.maps.Animation.DROP}
            position={currentLocation}
          ></Marker>
        </GoogleMap>
      </div>

      <div className="action-button-row">
        <Button onClick={handleDownloadImage}>Capture Map</Button>
        <div style={{ width: "50px" }}> </div>
        <Button className="button-red-secondary" onClick={toogleMapControls}>
          {defaultOptions.mapTypeControl ? "Hide " : "Show "}Controls
        </Button>
        <div style={{ width: "50px" }}> </div>
        <Button className="button-red-secondary" onClick={toogleShowMarker}>
          {showMarker ? "Hide " : "Show "}Marker
        </Button>
      </div>
    </div>
  );
};
export default GoogleMapComponent;
