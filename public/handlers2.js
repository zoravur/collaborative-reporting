// TODO: Add geocoding functionality to processCase
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

function uploadCaseFile(inputElement) {
  fb.uploadFile(inputElement);
}

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
