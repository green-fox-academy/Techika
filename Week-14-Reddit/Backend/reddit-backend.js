// Plot:
// Headers:

// Accept: application/json
// (Optional) Username: username
// --------------------------------

// GET /posts
// POST /posts
// PUT /posts/<id>/upvote
// PUT /posts/<id>/downvote

// Optional Feature endpoints
// DELETE /posts/<id></id>
// PUT /posts/<id></id>
//---------------------INIT-------------------------------------------
'use strict';
import express from 'express';
const app = express();
import * as mysql from 'mysql';
const credentials = {
  host: 'localhost',
  user: 'root',
  password: '2EFWg#z!jgu329',
  database: 'reddit',
};
const dbPool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '2EFWg#z!jgu329',
  database: 'reddit',
  // connectionLimit: 100,
});
//---------------------Middle-Warez-----------------------------------------------
app.use('/', (req, res, next) => {
  req.accepts('application/json');
  res.status(200);
  next();
});
//---------------------TEST Connection----------------------------------------------
app.get('/hello', (req, res) => {
  //console.log(user);
  res.send('hello ' + req.headers.username);
});
//----------------------CORE ---------------------------------------------
app.get('/posts', (req, res) => {
  // const db = mysql.createConnection(credentials);
  dbPool.getConnection((err, db) => {
    if (err) console.error(err);
    console.log('MySQL Connection Established: ', db.threadId);
    db.query(
      `
      SELECT 
        p.post_id AS id, 
        p.title, 
        p.url, 
        p.timestamp, 
        p.score,  
        u.username AS owner, 
        w.vote AS vote FROM reddit.posts AS p
      LEFT JOIN reddit.users AS u ON p.owner_id = u.user_id
      LEFT JOIN reddit.votes AS w ON w.post_id = p.post_id 
      AND w.user_id = (
        SELECT j.user_id FROM reddit.users AS j
          WHERE j.username = ?
      )
      GROUP BY p.post_id
      ;
      `,
      [req.headers.username],
      (err, results) => {
        if (err) {
          console.error(`Cannot retrieve data: ${err.toString()}`);
          res.sendStatus(500);
          return null;
        }
        // db.end();
        db.release((err) => {
          if (err) console.error(err);
        });

        const temp = JSON.stringify(results, null, 2);
        return res.send('<PRE>' + temp + '</PRE>');
      }
    );
  });
});

// app.post('/posts'), (req, res) => {

// }
//---------------------MAINTENANCE---------------------------------------
app.get('/maintain', (req, res) => {
  const db = mysql.createConnection(credentials);
  db.query(
    `
    UPDATE reddit.posts p
    LEFT JOIN 
    (
      SELECT post_id, sum(reddit.votes.vote) AS Vscore 
        FROM reddit.votes
      GROUP BY reddit.votes.post_id
    ) AS v on p.post_id = v.post_id
    SET p.score = v.Vscore
    ;
    `,
    (err, rows) => {
      if (err) {
        console.error(`Cannot retrieve data: ${err.toString()}`);
        res.sendStatus(500);
        return null;
      }
      db.end();
      const temp = JSON.stringify(rows, null, 2);
      return res.send('<PRE>' + temp + '</PRE>');
      // return res.send('OK');
    }
  );
});
//-----------------------------------------------------------------------
app.listen(8080, () => {
  console.log('Server listening on port 8080.');
});
