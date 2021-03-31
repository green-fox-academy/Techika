import myErrors from './myErrors.js';
import mySends from './mySends.js';

export default function ({
  xhrRequest,
  xhrResponse,
  dbConnection,
  dbQuery,
  dbError = myErrors.default,
  xhrOutputMethod = mySends.default,
}) {
  return dbConnection.query(...dbQuery(xhrRequest), (err, results) => {
    if (dbError(err, xhrResponse)) {
      return null;
    }
    xhrOutputMethod(results, xhrResponse, xhrRequest, dbConnection);
  });
}
