// TODO: Add geocoding functionality to processCase
// sorry
let fb = getFirebaseModule();
//let geocoder = getGeocoder();
function processCase() {
  let caseFile = {};
  caseFile.id = Math.round(Math.random() * 100000000);
  caseFile.date = new Date();
  var categoryItem = document.getElementById('category');
  caseFile.category = categoryItem.options[categoryItem.selectedIndex].text;
  caseFile.description = document.getElementById('description').value;
  caseFile.phone = document.getElementById('phone').value;
  caseFile.address = document.getElementById('address').value; 

  //push case file after they give permission.

  navigator.geolocation.getCurrentPosition(({coords}) => {
    //console.log(coords);
    let {latitude, longitude} = coords;
    caseFile.location = {lat: latitude, lng: longitude};
    fb.pushCaseFile(caseFile);
  });

  /*
  getNavigatorModule().getCoords(({latitude, longitude}) => {
    caseFile.location = {lat: latitude, lng: longitude};
    //caseFile.address = await geocoder.reverseGeocode(caseFile.location);
    fb.pushCaseFile(caseFile);
  });
  */
}

function uploadCaseFile(inputElement) {
  fb.uploadFile(inputElement);
}

async function init() {
  let storage = firebase.storage();
  //let fileDrop = document.getElementById('file-drop');
  
  let fb = getFirebaseModule();

  //TODO: Change so that files are not sent to server when attached
  //fileDrop.addEventListener('change', () => {
  //  fb.uploadFile(fileDrop);
  //});
}

init();
