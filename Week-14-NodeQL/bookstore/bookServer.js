const express = require('express');
const app = express();
const mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '2EFWg#z!jgu329',
  database: 'bookstore',
});

let htmlCore = (body) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Book Titles</title>
  </head>
  <body>
    <div class="notecontainer">
      ${body}
    </div>
  </body>
</html>
`;
};

// app.use('/', express.static('assets')); // serving static files // middleware
app.get('/', (req, res) => {
  res.send("I'm alive");
});
app.get('/bookstore', (req, res) => {
  res.send('This is the homepage');
});
app.get('/bookstore/titles', (req, res) => {
  db.query('SELECT book_name FROM bookstore.book_mast;', (err, rows) => {
    if (err) {
      console.error(`Cannot retrieve data: ${err.toString()}`);
      res.sendStatus(500);
      return null;
    }
    db.end();
    let htmlBody = '';
    //let booklist = rows.map((row) => row.book_name).foreach((book) => {
    let booklist = rows.forEach((row) => {
      htmlBody += `<p>${row.book_name}</p>`;
    });
    // console.log(booklist);
    return res.send(htmlCore(htmlBody)); //res.send(rows);
  });
});
app.get('/bookstore/test', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(htmlCore);
});
//------------------------------------------------------------
app.listen(8080);
// ------------------------------------------------------------
