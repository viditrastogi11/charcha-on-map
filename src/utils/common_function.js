export const getCurrentLocation = (setCurrentLocation) => {
  if (navigator.geolocation) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
              lat: +position.coords.latitude,
              lng: +position.coords.longitude,
            });
          });
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition((position) => {
            setCurrentLocation({
              lat: +position.coords.latitude,
              lng: +position.coords.longitude,
            });
          });
        } else if (result.state === "denied") {
          alert("Please allow location to use this feature.");
        }
        result.onchange = function () {};
      });
  } else {
    alert("Sorry Not available!");
  }
};
