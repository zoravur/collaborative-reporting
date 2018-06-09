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
function processCase() {
  let caseFile = {};
  caseFile.id = Math.random();
  caseFile.date = new Date();
  caseFile.description = document.getElementById('description').value;

  //push case file after they give permission.
  getNavigatorModule().getCoords(({latitude, longitude}) => {
    console.log('20');
    caseFile.location = {lat: latitude, long: longitude};
    fb.pushCaseFile(caseFile);
  });
}

function caseFileToString(caseFile) {
  var {id, location, date, description} = caseFile;
  let {lat,long} = location;
  return 'Case ID: ' + id + `<br>Location: ${lat}, ${long}` + '<br>Date:' + date + '<br>Description: ' + description + '<br><br>';
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

  caseFiles.forEach(caseFile => {
    asdf += caseFileToString(caseFile);
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
  function proximity(coords1, coords2) { 
    return Math.hypot(coords2.lat - coords1.lat, coords2.long - coords1.long);
  }  

  let coords1 = {lat: position.coords.latitude, long: position.coords.longitude};

  return cases.filter(function(caseFile) {
    let coords2 = caseFile.location;
    //Change this to reasonable setting
    return proximity(coords1, coords2) < 0.001;
  });
}

init();
