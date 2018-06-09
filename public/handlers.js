// sorry
let fb = getFirebaseModule();
//let geocoder = initGeoCoder();
function processCase() {
  let caseFile = {};
  caseFile.id = Math.random();
  caseFile.date = new Date();
  caseFile.description = document.getElementById('description').value;

  //push case file after they give permission.
  getNavigatorModule().getCoords(({latitude, longitude}) => {
    caseFile.location = {lat: latitude, lng: longitude};
    //caseFile.address = await geocoder.reverseGeocode(caseFile.location);
    fb.pushCaseFile(caseFile);
  });
}

//TODO: Replace this rendersnapshot function with proper display in javascript + css
/*
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
      console.log(e);
    }
  });


  caseFiles.forEach((caseFile, i) => {
    //asdf += JSON.stringify(caseFile, 0, 2) + '<br>';
    setTimeout(() => geocoder.reverseGeocode(caseFile.location).then(console.log).catch(console.error), 5000 * i);
    asdf += caseFileToString(caseFile);
  });

  cases.innerHTML = asdf;
}
*/

//Main initialization of app.
async function init() {
  let storage = firebase.storage();
  let fileDrop = document.getElementById('file-drop');
  
  let fb = getFirebaseModule();

  //TODO: Change so that files are not sent to server when attached
  fileDrop.addEventListener('change', () => {
    fb.uploadFile(fileDrop);
  });
}

init();
