const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('assets'));
app.use(express.json());
app.listen(8080);

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });
app.get('/', (req, res) => {
  res.send("I'm alive");
});

app.post('/arrays', (req, res) => {
  let resObj = {};
  if (!req.body.what || !req.body.numbers) {
    resObj = {
      error: 'Please provide what to do with the numbers!',
    };
  } else {
    let result;
    switch (req.body.what) {
      case 'sum':
        result = req.body.numbers.reduce((prev, current) => prev + current);
        break;
      case 'multiply':
        result = req.body.numbers.reduce((prev, current) => prev * current);
        break;
      case 'double':
        result = req.body.numbers.map((n) => n * 2);
        break;
      default:
        result = "ERROR: I don't understand this command";
        break;
    }
    resObj = {
      result: result,
    };
  }
  res.json(resObj);
});
