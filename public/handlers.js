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

function renderSnapshot(snapshot) {
  var snap = snapshot.val() || {};

  var cases = document.getElementById('cases');
  var asdf = '';

  Object.keys(snap).forEach(function(key) {
    asdf += caseFileToString(snap[key]);
  });
  cases.innerHTML = asdf;
}

//Main initialization of app.
function init() {
  let storage = firebase.storage();
  let fileDrop = document.getElementById('file-drop');
  
  let fb = getFirebaseModule();
  fileDrop.addEventListener('change', () => {
    fb.uploadFile(fileDrop);
  });
  fb.onDatabaseChange(renderSnapshot);
}

init();
