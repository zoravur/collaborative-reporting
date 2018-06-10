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

function caseFileToCard(caseFile){
  var {id, location, date, category, description, phone} = caseFile;
  let {lat,long} = location; 


  var cards = document.getElementById('cards');

  // 1st tag 
  var colDiv = document.createElement('div'); 
  colDiv.className = 'col s4'; 

  // 2nd tag 
  var contentDiv = document.createElement('div'); 
  contentDiv.className = 'card blue-grey darken-1'; 

  // 3rd tag
  var contentInside = document.createElement('div'); 
  contentInside.className = 'card-content white-text'; 

  // set as child 
  //cards.appendChild(rowDiv); 
  cards.appendChild(colDiv); 
  colDiv.appendChild(contentDiv);
  contentDiv.appendChild(contentInside);

  // add a title 
  var title = document.createElement('span');
  title.className = 'card-title'; 
  contentInside.appendChild(title); 
  title.innerHTML = category; 

  // add the description 
  var text = document.createElement('p');
  text.innerHTML = description; 
  contentInside.appendChild(text); 

  // add the link 
  var linkSection = document.createElement('div'); 
  linkSection.className = 'card-action'; 
  contentDiv.appendChild(linkSection); 

  var link = document.createElement('a'); 
  link.innerHTML = 'Create Report'; 
  link.setAttribute('id', 'link-item');
  linkSection.appendChild(link); 

  link.addEventListener('click',function() {createPDF(caseFile);}); 

  var secondLinkSection = document.createElement('div'); 
  secondLinkSection.className = 'card-action'; 
  contentDiv.appendChild(secondLinkSection); 

  var evidenceLink = document.createElement('a'); 
  evidenceLink.innerHTML = 'Add Evidence'; 
  evidenceLink.setAttribute('id', 'link-item');
  secondLinkSection.appendChild(evidenceLink); 

  evidenceLink.addEventListener('click',function() {showDropzone(caseFile);}); 
}

function showDropzone(caseFile) {
  var elem = document.querySelector('.modal');
  document.getElementById('modal-title').textContent = caseFile.id;
  var instance = M.Modal.init(elem);
  instance.open();

}


function renderCards(snapshot){
  var snap = snapshot.val() || {};
  var cases = document.getElementById('cards');

  Object.keys(snap).forEach(function(key) {
    caseFileToCard(snap[key]);
  });
}

//Main initialization of app.
function init() {
  let storage = firebase.storage();
  let fb = getFirebaseModule();
  
  let fileDrop = document.getElementById('file-drop');

  fb.onDatabaseChange(renderCards);

  var elem = document.querySelector('.modal');
  var instance = M.Modal.init(elem);
  instance.open();

  window.addEventListener('dragover',function(e){
    e = e || event;
    e.preventDefault();
  },false);
  window.addEventListener('drop',function(e){
    e = e || event;
    e.preventDefault();
  },false);

}

init();
