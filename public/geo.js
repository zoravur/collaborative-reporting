handlePermission();

let nav = navigator.geolocation;
function getCoords(callback) {
  nav.getCurrentPosition(({coords}) => callback(coords));
}

let getNavigatorModule = () => ({
  getCoords: getCoords
});

function handlePermission() {
  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      report(result.state);
    } else if (result.state == 'prompt') {
      report(result.state);
    } else if (result.state == 'denied') {
      report(result.state);
    }
    result.onchange = function() {
      report(result.state);
    };
  });
}

function report(state) {
  console.log('Permission ' + state);
}

