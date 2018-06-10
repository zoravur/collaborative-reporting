var localtunnel = require('localtunnel');
var express = require('express');

var app = express();
app.use(express.static('./public/handlers.js'));
app.use(express.static('./public/handlers2.js'));
app.use(express.static('./public/cards.js'));
app.use(express.static('./public/utility.js'));
app.use(express.static('./public/firebaseModule.js'));
app.use(express.static('./public/geo.js'));

const accountSid = 'AC9364959913a3c25fe5553bf3fd098da7';
const authToken = 'ad95ec4a76bfa5bdf893adb471c1e0aa';
const client = require('twilio')(accountSid, authToken);

app.get('/', (req, res) => {
  console.log('kms');
  res.sendFile(__dirname + '/public/cards.html');
});

app.post('/uploadVideo', (req, res) => {
  var path = "path";
  var spawn = require("child_process").spawn;
  var pythonProcess = spawn('python',["video_processing/main.py", path]);
  console.log('asdf');
});

app.post('/sendAlert', (req, res) => {
  client.messages
      .create({
         body: `A new case file in your area has been reported!`,
         from: '+16479648638',
         to: '+1' + req.body
       })
      .then(message => console.log(message.sid))
      .done();
});


app.listen(3000, () => {console.log('Listening on 3000');});

var tunnel = localtunnel(3000, {subdomain: "zoravur"}, function(err, tunnel) {
    if (err) {
      console.log(err);
    }

    console.log(tunnel.url);
});
