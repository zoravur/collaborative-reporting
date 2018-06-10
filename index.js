var express = require('express');
var  path = require('path');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const accountSid = 'AC9364959913a3c25fe5553bf3fd098da7';
const authToken = 'ad95ec4a76bfa5bdf893adb471c1e0aa';
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/cards.html');
});

app.post('/uploadVideo', (req, res) => {
  var path = JSON.stringify(req.body);
  path = path.substring(2, path.lastIndexOf('"')-3);

  var spawn = require('child_process').spawn;
  var pythonProcess = spawn('python', ['video_processing/main.py', path]);

  res.sendStatus(200);
});

app.post('/sendAlert', (req, res) => {

  var number = JSON.stringify(req.body);
  number = number.substring(2, 12);

  client.messages.create({
         body: `A new case file in your area has been reported!`,
         from: '+16476948638',
         to: '+1' + number
       })
      .then(message => console.log(message.sid))
      .done();
});


app.listen(4000, () => {console.log('Listening on 4000');});
