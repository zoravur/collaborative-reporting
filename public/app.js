var config = {
  apiKey: 'AIzaSyD8JJvhxuwmYyJfftVTST-Id-SeMsxrAHs ',
  authDomain: 'collaborative-reporting.firebaseapp.com',
  projectId: 'collaborative-reporting',
  databaseURL: 'https://collaborative-reporting.firebaseio.com',
  storageBucket: 'gs://collaborative-reporting.appspot.com',
};

firebase.initializeApp(config);

var database = firebase.database();
var storage = firebase.storage();

function pushCaseFile(postData) {
  var newFileKey = database.ref().child('caseFiles').push().key;

  var updates = {};
  updates['/caseFiles/' + newFileKey] = postData;

  return firebase.database().ref().update(updates);
}

function onDatabaseChange(callback) {
  database.ref('caseFiles').on('value', callback);
}

function uploadFile(input) {

  var file = input.files[0];

  var caseFileID = document.getElementById('caseFileID').value;

  if(caseFileID == '') {
    alert('Please enter the case file ID.');
  } else {

    const name = (+new Date()) + '-' + file.name;
    const metadata = { contentType: file.type };
    const task = storage.ref().child(caseFileID).child(name).put(file, metadata);

    task.then((snapshot) => {
      alert(snapshot.downloadURL);
    });
  }

}

function getFirebaseModule() {
  return {
    pushCaseFile: pushCaseFile,
    onDatabaseChange: onDatabaseChange,
    uploadFile: uploadFile
  };
}
