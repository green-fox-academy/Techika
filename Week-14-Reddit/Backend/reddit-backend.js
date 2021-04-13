//---------------------IMPORTS-------------------------------------------
'use strict';
import express from 'express';
const app = express();
import dbConnect from './assets/sql/dbconnect.js';
import myQueries from './assets/sql/myQueries.js';
import myErrors from './assets/sql/myErrors.js';
import mySends from './assets/sql/mySends.js';
import doQuery from './assets/sql/doQuery.js';
import myResultFilters from './assets/sql/myResultFilters.js';
import { json } from 'body-parser';

//-----------------------------------------INIT-------------------------------------------
const dbPool = dbConnect();

//------------------------------------Middle-Warez----------------------------------------
app.use('/', (req, res, next) => {
  req.accepts('application/json');
  res.status(200);
  // res.setHeader('Content-Type', 'application/json'); // Turn back on after I don't need the pretty output any more.
  next();
});
app.use(express.json());
//----------------------------------TEST Connection---------------------------------------
app.get('/hello', (req, res) => {
  //console.log(user);
  res.send('hello ' + req.headers.username);
});
//--------------------------------------CORE ---------------------------------------------
//----------------------\\
//==      GET Posts     ==\\
//--------------------------\\
app.get('/posts/:postid?', (req, res) => {
  if (req.params.postid) {
    req.headers.postid = req.params.postid;
  }
  doQuery(req, res, dbPool, {
    dbQuery: myQueries.getPosts,
    resultFilter: myResultFilters.warnInvalidPostID,
  });
});

//----------------------\\
//==    Create Posts    ==\\
//--------------------------\\
app.post('/posts', (req, res) => {
  // prevalidate input
  if (!req.body.title || !req.body.url) {
    res.status(400).json({
      Error:
        'Please provide both the post TITLE and URL, preferably also send USERNAME via the header.',
    });
    return;
  }
  // send update to server
  doQuery(req, res, dbPool, {
    dbQuery: myQueries.postPost,
    xhrOutputMethod: mySends.reQuery,
  });
});
//----------------------\\
//       Mod Posts
//--------------------------\\
app.put('/posts/:postid/:vote?', (req, res) => {
  //==   Prevaldation  ==\\
  try {
    if (typeof req.headers.username === undefined) {
      throw new Error('For post modification, username must be sent via header');
    } else if (req.params.vote && req.params.vote !== 'upvote' && req.params.vote !== 'downvote') {
      throw new Error('Valid put options for /posts/<postID>/: upvote or downvote');
    } else if (!req.params.vote && !(req.body.title || req.body.url)) {
      throw new Error('For updating a post you need to provide at least a title or an url');
    }
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }

  //==   Update Posts   ==\\
  if (!req.params.vote) {
    doQuery(req, res, dbPool, {
      dbQuery: myQueries.checkPostOwner,
      resultFilter: myResultFilters.onlyPostOwner,
      xhrOutputMethod: mySends.reQuery,
      nextQuery: {
        dbQuery: myQueries.updatePost,
        xhrOutputMethod: mySends.reQuery,
      },
    });
  }

  //==   up or down votes:  ==\\
  if (req.params.vote === 'upvote' || req.params.vote === 'downvote') {
    doQuery(req, res, dbPool, {
      dbQuery: myQueries.checkPostOwner,
      resultFilter: myResultFilters.excludePostOwner,
      xhrOutputMethod: mySends.reQuery,
      nextQuery: {
        dbQuery: myQueries.votePost,
        xhrOutputMethod: mySends.reQuery,
      },
    });
  }
});

//----------------------\\
//      Delete Posts
//--------------------------\\
app.delete('/posts/:postid', (req, res) => {
  //==   Prevaldation  ==\\
  try {
    if (typeof req.headers.username === undefined) {
      throw new Error('For post deletion, username must be sent via header');
    }
  } catch (error) {
    return res.status(400).json({ Error: error.message });
  }

  //==   Delete Posts   ==\\
  if (!req.params.vote) {
    doQuery(req, res, dbPool, {
      dbQuery: myQueries.checkPostOwner,
      resultFilter: myResultFilters.onlyPostOwner,
      xhrOutputMethod: mySends.reQuery,
      nextQuery: {
        dbQuery: myQueries.deletePost,
        xhrOutputMethod: mySends.reQuery,
        nextQuery: {
          dbQuery: myQueries.getPosts,
          resultFilter: myResultFilters.confirmDeletePost,
        },
      },
    });
  }
});
//---------------------------------------MAINTENANCE---------------------------------------
app.get('/dbmaintain', (req, res) => {
  doQuery(req, res, dbPool, {
    dbQuery: myQueries.maintainScores,
  });
});

//-----------------------------------OUTRO---------------------------------------------------
app.listen(8080, () => {
  console.log('Server listening on port 8080.');
});
