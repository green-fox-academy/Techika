import myErrors from './myErrors.js';
import doQuery from './doQuery.js';
import myQueries from './myQueries.js';

export default {
  default: ({ queryResults, xhrResponse }) => {
    return xhrResponse.json(queryResults);
  },
  test: ({ queryResults, xhrResponse }) => {
    const temp = JSON.stringify(queryResults, null, 2);
    return xhrResponse.send('<PRE>' + temp + '</PRE>');
  },
  reQuery: ({ queryResults, xhrResponse, xhrRequest, dbConnection, nextQuery }) => {
    doQuery(xhrRequest, xhrResponse, dbConnection, { preSults: queryResults, ...nextQuery });
  },
};
