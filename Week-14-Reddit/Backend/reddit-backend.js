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
//---------------------Middle-Warez-----------------------------------------------
app.use('/', (req, res, next) => {
  req.accepts('application/json');
  res.statusCode(200);
  console.log('happened');
  next();
});
//---------------------TEST Connection----------------------------------------------
app.get('/hello', (req, res) => {
  res.send('hello world');
});
//-------------------------------------------------------------------
app.get('/posts', (req, res) => {});
//-----------------------------------------------------------------------
app.listen(8080);
