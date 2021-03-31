import myErrors from './myErrors.js';
import doQuery from './doQuery.js';
import myQueries from './myQueries.js';

export default {
  default: (results, res) => {
    return res.json(results);
  },
  test: (results, res) => {
    const temp = JSON.stringify(results, null, 2);
    return res.send('<PRE>' + temp + '</PRE>');
  },
  reQuery: (results, res, xhrRequest, dbConnection) => {
    const req = {
      headers: {
        postID: results.insertId,
        username: xhrRequest.headers.username,
      },
    };
    doQuery({
      xhrRequest: req,
      xhrResponse: res,
      dbConnection: dbConnection,
      dbQuery: myQueries.getPosts,
    });
  },
};
