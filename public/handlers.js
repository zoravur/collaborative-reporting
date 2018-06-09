function newCaseFile(id, location, date, description) {
  return {
    location: location,
    date: date,
    id: id,
    description: description
  };
}


// sorry
let fb = getFirebaseModule();
let geocoder = initGeoCoder();
function processCase() {
  let caseFile = {};
  caseFile.id = Math.random();
  caseFile.date = new Date();
  caseFile.description = document.getElementById('description').value;

  //push case file after they give permission.
  getNavigatorModule().getCoords(({latitude, longitude}) => {
    console.log('20');
    caseFile.location = {lat: latitude, lng: longitude};
    caseFile.address = await geocoder.reverseGeocode(caseFile.location);
    fb.pushCaseFile(caseFile);
  });
}


function caseFileToString(caseFile) {
  var {id, location, date, description} = caseFile;
  let {lat,lng} = location;
  return 'Case ID: ' + id + `<br>Location: ${lat}, ${lng}` + '<br>Date:' + date + '<br>Description: ' + description + '<br><br>';
}


async function renderSnapshot(snapshot) {
  var snap = snapshot.val() || {};

  var cases = document.getElementById('cases');
  var asdf = '';

  let caseFiles = [];
  Object.keys(snap).forEach(function(key) {
    caseFiles.push(snap[key]);
  });

  let position = await new Promise((res, rej) => {
    navigator.geolocation.getCurrentPosition(res, rej);
  });

  caseFiles = filterCasesByLocation(position, caseFiles);

  console.log(caseFiles.length);
  caseFiles.forEach(async (caseFile) => {
    try {
      caseFile.location = await geocoder.reverseGeocode(caseFile.location);
    } catch (e) {
      console.log('you are dumb because' + e);
    }
  });


  caseFiles.forEach((caseFile, i) => {
    asdf += JSON.stringify(caseFile, 0, 2) + '<br>';
    setTimeout(() => geocoder.reverseGeocode(caseFile.location).then(console.log).catch(console.error), 5000 * i);
    //asdf += caseFileToString(caseFile);
  });

  cases.innerHTML = asdf;
}

//Main initialization of app.
async function init() {
  let storage = firebase.storage();
  let fileDrop = document.getElementById('file-drop');
  
  let fb = getFirebaseModule();
  fileDrop.addEventListener('change', () => {
    fb.uploadFile(fileDrop);
  });
  
  fb.onDatabaseChange(renderSnapshot);
}

function filterCasesByLocation(position, cases) {
  function getDistanceInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1); 
    var a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ; 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c; // Distance in km
    return d;
  }

  function deg2rad(deg) {
    return deg * (Math.PI/180);
  }

  function proximity(coords1, coords2) { 
    return getDistanceInKm(coords1.lat, coords1.lng, coords2.lat, coords2.lng);
  }  

  let coords1 = {lat: position.coords.latitude, lng: position.coords.longitude};

  return cases.filter(function(caseFile) {
    let coords2 = caseFile.location;
    console.log(coords2);
    return proximity(coords1, coords2) < 10;
  });
}

init();
