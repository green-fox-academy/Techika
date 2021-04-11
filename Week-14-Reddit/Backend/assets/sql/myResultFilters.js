import myErrors from './myErrors.js';
import doQuery from './doQuery.js';
import myQueries from './myQueries.js';

export default {
  onlyPostOwner: ({ queryResults, xhrResponse }) => {
    if (!queryResults.length) {
      xhrResponse.status(403).json({ Error: "Only the post's owner can modify or delete a post" });
      return 'stop';
    } else {
      return 'ok';
    }
  },
  excludePostOwner: ({ queryResults, xhrResponse }) => {
    if (queryResults.length) {
      xhrResponse.status(403).json({ Error: 'Users not allowed to vote on self-owned posts' });
      return 'stop';
    } else {
      return 'ok';
    }
  },
  repollCreatedPost: ({ queryResults, xhrRequest }) => {
    if (!xhrRequest.params.postid) {
      xhrRequest.params.postid = queryResults.insertId;
    }
    return;
  },
  confirmDeletePost: ({ queryResults, xhrResponse, xhrRequest }) => {
    if (!queryResults.length) {
      xhrResponse.json({ Result: `Post ID:${xhrRequest.params.postid} successfully deleted` });
      return 'stop';
    } else {
      return 'not deleted';
    }
  },
  warnInvalidPostID: ({ queryResults, xhrResponse, xhrRequest }) => {
    if (!queryResults.length) {
      xhrResponse.status(404).json({ Error: `Post ID:${xhrRequest.params.postid} doesn't exist` });
      return 'stop';
    } else {
      return 'not exist';
    }
  },
};
