const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('assets'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
// app.get('/doubling', (req, res) => {
//   // res.send(String(parseInt(req.params.input) * 2));
//   console.log('input:' + req.query.input);
//   res.writeHead(200, { 'Content-Type': 'application/json' });
//   myObj = {
//     error: 'Please provide an input!',
//   };
//   res.end(JSON.stringify(myObj));
// });
app.get('/doubling', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  let resObj = {};
  if (req.query.input) {
    resObj = {
      received: Number(req.query.input),
      result: req.query.input * 2,
    };
  } else {
    resObj = {
      error: 'Please provide an input!',
    };
  }
  res.end(JSON.stringify(resObj));
});

app.get('/greeter', (req, res) => {
  let resObj = {};
  let statusCode;
  if (!req.query.name || !req.query.title) {
    statusCode = 400;
    if (!req.query.name && req.query.title) {
      resObj = {
        error: 'Please provide a name!',
      };
    }
    if (req.query.name && !req.query.title) {
      resObj = {
        error: 'Please provide a title!',
      };
    }
    if (!req.query.name && !req.query.title) {
      resObj = {
        error: 'Please provide a name and a title!',
      };
    }
  } else {
    statusCode = 200;
    resObj = {
      welcome_message: `Oh, hi there ${req.query.name}, my dear ${req.query.title}!`,
    };
  }
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(resObj));
});

app.listen(3001);
