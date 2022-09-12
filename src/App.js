import "./App.css";
import { useLoadScript } from "@react-google-maps/api";
import { mapApiKey } from "./utils/constant";

import LoadingSpinner from "./Components/LoadingSpinner";
import GoogleMapComponent from "./Container/GoogleMap";
import CommentOnPic from "./Container/CommentOnPic";
import { useState } from "react";

const libraries = ["places"];
function App() {
  const [image, setImage] = useState(null);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: mapApiKey,
    libraries: libraries,
  });

  return (
    <div className="App">
      <div className="map-charcha">
        {isLoaded ? (
          <div>
            {image === null ? (
              <GoogleMapComponent {...{ setImage }}></GoogleMapComponent>
            ) : (
              <CommentOnPic image={image}></CommentOnPic>
            )}
          </div>
        ) : (
          <LoadingSpinner></LoadingSpinner>
        )}
      </div>
    </div>
  );
}

export default App;
