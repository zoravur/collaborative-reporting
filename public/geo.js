function getCoords(callback) {
  navigator.geolocation.getCurrentPosition(({coords}) => callback(coords));
}

let getNavigatorModule = () => ({
  getCoords: getCoords
});


function initGeoCoder() {
  var geocoder = new google.maps.Geocoder;

  function getGeoAddress(latlng) {
    return new Promise((res, rej) => {
      geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === 'OK') {
          if (results[0]) {
            res(results[0].formatted_address);
          } else {
            throw new Error('geocoding failed');
            //rej('something bad happened');
          }
        } else {
          rej(status);
        }
      });
    });
  }

  return {reverseGeocode: getGeoAddress};
}

