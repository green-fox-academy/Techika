import myErrors from './myErrors.js';
import mySends from './mySends.js';
import myQueries from './myQueries.js';
import myResultFilters from './myResultFilters.js';

export default function (
  xhrRequest,
  xhrResponse,
  dbConnection,
  {
    preSults = null, // if needed it can be used while chaining queryResults directly.
    dbQuery,
    dbError = myErrors.default,
    resultFilter = myResultFilters.repollCreatedPost,
    xhrOutputMethod = mySends.default,
    nextQuery = {
      // Default reQuery:
      dbQuery: myQueries.getPosts,
      resultFilter: myResultFilters.warnInvalidPostID,
    },
  }
) {
  return dbConnection.query(...dbQuery(xhrRequest), (err, queryResults) => {
    if (dbError(err, xhrResponse)) {
      return null;
    }
    if (resultFilter) {
      if (
        resultFilter({
          queryResults: queryResults,
          xhrResponse: xhrResponse,
          xhrRequest: xhrRequest,
        }) === 'stop'
      ) {
        return null;
      }
    }
    return xhrOutputMethod({
      queryResults: queryResults,
      xhrResponse: xhrResponse,
      xhrRequest: xhrRequest,
      dbConnection: dbConnection,
      nextQuery: nextQuery,
    });
  });
}
