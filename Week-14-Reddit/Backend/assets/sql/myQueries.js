import * as mysql from 'mysql';
import myQueries from './myQueries.js';
export default {
  getPosts: (req) => {
    return [
      `
      SELECT 
        p.post_id AS id, 
        p.title, 
        p.url, 
        p.timestamp, 
        p.score,  
        u.username AS owner, 
        IFNULL (w.vote,0) AS vote 
      FROM reddit.posts AS p
        LEFT JOIN reddit.users AS u ON p.owner_id = u.user_id
        LEFT JOIN reddit.votes AS w ON w.post_id = p.post_id 
          AND w.user_id = (
            SELECT j.user_id FROM reddit.users AS j
              WHERE j.username = ${mysql.escape(req.headers.username)}
          )
      WHERE p.is_deleted = 0
        ${req.headers.postID ? `AND p.post_id = ${mysql.escape(req.headers.postID)} ` : ''}
      GROUP BY p.post_id
      ;
      `,
    ];
  },

  postPosts: (req) => {
    return [
      `
      INSERT INTO reddit.posts 
        (title, url, owner_id) 
      VALUES 
        (?, ?, NULLIF((
          SELECT u.user_id 
          FROM reddit.users AS u 
          WHERE u.username = ?
          ),'')
        )
      ;
    `,
      [req.body.title, req.body.url, req.headers.username],
    ];
  },
  votePosts: (req) => {
    // console.log({ params: { postid: req.params.postid } });
    // console.log(myQueries.maintainScores({ params: { postid: req.params.postid } }));
    return [
      `
      INSERT INTO reddit.votes (user_id, post_id, vote) 
      VALUES (
        (
          SELECT u.user_id 
          FROM reddit.users AS u 
          WHERE u.username = ?
        )
        , ? 
        , IF(${`${mysql.escape(req.params.vote)}`} = 'upvote',1,-1) 
      )
      ON DUPLICATE KEY UPDATE 
      vote = IF( ${mysql.escape(req.params.vote)} = 'downvote',
        IF(vote = -1, 0, -1),
            IF(${mysql.escape(req.params.vote)} = 'upvote' and vote = 1, 0, 1) 
        )
      ;
      ${myQueries.maintainScores({ params: { postid: req.params.postid } })}
      `,
      [req.headers.username, req.params.postid, req.params.vote],
    ];
  },
  maintainScores: (req) => {
    return [
      `
      UPDATE reddit.posts p
      LEFT JOIN 
      (
        SELECT post_id, sum(reddit.votes.vote) AS Vscore 
          FROM reddit.votes
        GROUP BY reddit.votes.post_id
      ) AS v on p.post_id = v.post_id
      SET p.score = ifnull(Vscore,0)
      WHERE p.is_deleted = 0
      ${req.params.postid ? `AND p.post_id = ${mysql.escape(`${req.params.postid}`)}` : ''}
      ;
      `,
    ];
  },
};
