var localtunnel = require('localtunnel');
var express = require('express');

var app = express();
app.use(express.static('./public/handlers.js'));
app.use(express.static('./public/handlers2.js'));
app.use(express.static('./public/cards.js'));
app.use(express.static('./public/utility.js'));
app.use(express.static('./public/firebaseModule.js'));
app.use(express.static('./public/geo.js'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.post('/uploadVideo' (req, res) => {
  var path = "path";
  var spawn = require("child_process").spawn;
  var pythonProcess = spawn('python',["video_processing/main.py", path]);
});


app.listen(3000, () => {console.log('Listening on 3000');});

var tunnel = localtunnel(3000, {subdomain: "zoravur"}, function(err, tunnel) {
    if (err) {
      console.log(err);
    }

    console.log(tunnel.url);
});
