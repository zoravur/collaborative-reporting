let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, () => {console.log('Listening on 3000');});
