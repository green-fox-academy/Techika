import express from 'express';
const app = express();
import * as mysql from 'mysql';
// const db = mysql.createConnection({
//   // host: 'localhost',
//   // user: 'root',
//   // password: '2EFWg#z!jgu329',
//   // database: 'bookstore',
// });

const htmlCore = (results) => {
  return `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Book Store</title>
    <style>
      th {
        background-color: grey;
      }
      td {
        padding:5px;
      }
      tr:nth-child(odd) {
        background-color: lightgrey;
      }
    </style>
  </head>
  <body>
    <div class="notecontainer">
      <p><u>BUK's BOOK STORE:</u></p><br>
      <table>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
          <th>Publisher</th>
          <th>Price</th>
        </tr>
        ${results}
      </table>
    </div>
  </body>
</html>
`;
};
const htmlResultRow = (data) => {
  return `
  <tr>
    <td>${data.title}</td>
    <td>${data.author}</td>
    <td>${data.category}</td>
    <td>${data.publisher}</td>
    <td>${data.price}</td>
  </tr>
`;
};

app.get('/', (req, res) => {
  res.send("I'm alive");
});

app.get('/bookstore', (req, res) => {
  const db = mysql.createConnection({
    host: 'buk.b2center.de',
    user: 'd035d455',
    password: '5mmuYV8hfG8Rop9P',
    database: 'd035d455',
  });
  db.query(
    `
    SELECT 
      master.*, 
      author.aut_name author,
      category.cate_descrip category,
      publisher.pub_name publisher
    FROM book_mast AS master
      INNER JOIN author ON master.aut_id = author.aut_id
      INNER JOIN category ON master.cate_id = category.cate_id
      INNER JOIN publisher ON master.pub_id = publisher.pub_id
    HAVING
      category like '%'
    ${req.query.category ? `AND category like "%${mysql.escape(`%${req.query.category}%`)}` : ''}
    ${req.query.publisher ? `AND publisher like "%${mysql.escape(`%${req.query.publisher}%`)}` : ''}
    ${req.query.title ? `AND book_name like "%${mysql.escape(`%${req.query.title}%`)}` : ''}
    ${req.query.author ? `AND author like ${mysql.escape(`%${req.query.author}%`)}` : ''}
    ${req.query.category ? `AND category like "%${mysql.escape(`%${req.query.category}%`)}` : ''}
    ${req.query.pgt ? `AND book_price > ${mysql.escape(req.query.pgt)}` : ''}
    ${req.query.plt ? `AND book_price < ${mysql.escape(req.query.plt)}` : ''}
  ;`,
    (err, rows) => {
      if (err) {
        console.error(`Cannot retrieve data: ${err.toString()}`);
        res.sendStatus(500);
        return null;
      }
      db.end();
      let results = '';
      rows.forEach((row) => {
        results += htmlResultRow({
          title: row.book_name,
          category: row.category,
          author: row.author,
          publisher: row.publisher,
          price: row.book_price,
        });
      });
      if (req.query.category || req.query.publisher || req.query.pgt || req.query.plt) {
        results += htmlResultRow({
          title: `<b>Filters:${req.query.title || '__'}</b>`,
          author: `<b>${req.query.author || '__'}</b>`,
          category: `<b>${req.query.category || '__'}</b>`,
          publisher: `<b>${req.query.publisher || '__'}</b>`,
          price: `<b>${req.query.pgt || '0'} < ${req.query.plt || 'oo'}</b>`,
        });
      }
      return res.send(htmlCore(results));
    }
  );
});

//------------------------------------------------------------
app.listen(8080);
// ------------------------------------------------------------
