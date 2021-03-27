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
  const db = mysql.createConnection(credentials);
  db.query(
    `
    select 
    p.post_id as id, 
      p.title, p.url, 
      p.timestamp, 
      p.score,  
      u.username as owner, 
      w.vote as vote from reddit.posts as p
  left join reddit.users as u on p.owner_id = u.user_id
  left join reddit.votes as w on w.post_id = p.post_id 
  and w.user_id = (
    select j.user_id from reddit.users as j
      where j.username = ?
  )
  group by p.post_id
    ;
    `,
    req.headers.username,
    (err, rows) => {
      if (err) {
        console.error(`Cannot retrieve data: ${err.toString()}`);
        res.sendStatus(500);
        return null;
      }
      db.end();
      const temp = JSON.stringify(rows, null, 2);
      return res.send('<PRE>' + temp + '</PRE>');
    }
  );
});
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
app.listen(8080);
