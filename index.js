let express = require('express');
let app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello</h1>');
});

app.listen(3000, () => {console.log('Listening on 3000');});
