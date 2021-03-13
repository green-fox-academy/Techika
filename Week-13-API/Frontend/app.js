const express = require('express');
const path = require('path');
const app = express();

app.use(express.static('assets'));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

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

app.get('/appenda/:appendable', (req, res) => {
  console.log(req.params.appendable);
  let resObj = {
    appended: req.params.appendable + 'a',
  };
  res.writeHead(200, { 'Content-Type': 'application/json' }
  res.end(JSON.stringify(resObj));
});

// const jsonParser = bodyParser.json();
app.use(express.json());
app.post('/dountil/:action/', (req, res) => {
  const n = Number(req.body.until);
  let resObj = {};
  if (req.params.action === 'sum') {
    const solution = (n * (n + 1)) / 2;
    resObj = {
      result: solution,
    };
  } else if (req.params.action === 'factor') {
    const solution = (n) => {
      let result = n;
      for (let i = n - 1; i > 0; i--) {
        result = result * i;
      }
      return result;
    };
    resObj = {
      result: solution(n),
    };
  }

  res.json(resObj);
});

app.listen(3001);
