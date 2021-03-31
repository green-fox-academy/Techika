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
//---------------------IMPORTS-------------------------------------------
'use strict';
import express from 'express';
const app = express();
import * as mysql from 'mysql';
import * as loginto from './assets/loginto.js';
import dbConnect from './assets/sql/dbconnect.js';
// import myScallback from './assets/sql/myScallback.js';
// import queries from './assets/sql/myQueries.js';

import myQueries from './assets/sql/myQueries.js';
import myErrors from './assets/sql/myErrors.js';
import mySends from './assets/sql/mySends.js';
import doQuery from './assets/sql/doQuery.js';

// console.log(queries.getPosts);

//---------------------INIT-------------------------------------------
const dbPool = dbConnect();

//---------------------Middle-Warez-----------------------------------------------
app.use('/', (req, res, next) => {
  req.accepts('application/json');
  res.status(200);
  // res.setHeader('Content-Type', 'application/json'); // Turn back on after I don't need the pretty output any more.
  next();
});
app.use(express.json());
//---------------------TEST Connection----------------------------------------------
app.get('/hello', (req, res) => {
  //console.log(user);
  res.send('hello ' + req.headers.username);
});
//----------------------CORE ---------------------------------------------
app.get('/posts', (req, res) => {
  doQuery({
    xhrRequest: req,
    xhrResponse: res,
    dbConnection: dbPool,
    dbQuery: myQueries.getPosts,
  });
});

app.post('/posts', (req, res) => {
  // prevalidate input
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      error: 'Please provide both the post TITLE and URL, optionally send USERNAME via the header.',
    });
    return;
  }
  // send update to server
  doQuery({
    xhrRequest: req,
    xhrResponse: res,
    dbConnection: dbPool,
    dbQuery: myQueries.postPosts,
    xhrOutputMethod: mySends.reQuery,
  });
});

//---------------------MAINTENANCE---------------------------------------
app.get('/dbmaintain', (req, res) => {
  doQuery({
    xhrRequest: req,
    xhrResponse: res,
    dbConnection: dbPool,
    dbQuery: myQueries.maintainScores,
  });
});

//--------------------OUTRO---------------------------------------------------
app.listen(8080, () => {
  console.log('Server listening on port 8080.');
});
