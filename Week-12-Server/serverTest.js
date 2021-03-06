const http = require('http');
// -----
const server = http.createServer(function (req, res) {
  console.log('request was made');
  res.writeHead(200, { 'content-type': 'text/plain' });
  res.end('Hey ninjas');
});

server.listen(3000, '127.0.0.1');
console.log('Now listening to port 3000');

// Above tested, all working!
// stop listening:
server.close(function () {
  console.log('stopped listening');
  // process.exit();
});

const express = require('express');
const app = express();
app.use('/', express.static('assets')); // serving static files // middleware
app.get('/stuff', function (req, res) {
  res.send('This is the homepage');
});

// query...
app.get('/contact', function (req, res) {
  console.log(req.query);
});

app.listen(3001);
