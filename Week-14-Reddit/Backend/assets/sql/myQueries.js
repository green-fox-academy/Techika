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
      FROM posts AS p
        LEFT JOIN users AS u ON p.owner_id = u.user_id
        LEFT JOIN votes AS w ON w.post_id = p.post_id 
          AND w.user_id = (
            SELECT j.user_id FROM users AS j
              WHERE j.username = ${mysql.escape(req.headers.username)}
          )
      WHERE p.is_deleted = 0
        ${req.params.postid ? `AND p.post_id = ${mysql.escape(req.params.postid)} ` : ''}
      GROUP BY p.post_id
      ;
      `,
    ];
  },

  postPost: (req) => {
    return [
      `
      INSERT INTO posts 
        (title, url, owner_id) 
      VALUES 
        (?, ?, NULLIF((
          SELECT u.user_id 
          FROM users AS u 
          WHERE u.username = ?
          ),'')
        )
      ;
    `,
      [req.body.title, req.body.url, req.headers.username],
    ];
  },
  checkPostOwner: (req) => {
    return [
      `
      SELECT 
        p.post_id
      FROM posts p
      WHERE p.post_id = ?
        AND p.is_deleted = 0
        AND p.owner_id = (
          SELECT u.user_id 
          FROM users AS u 
          WHERE u.username = ?
          )
      ;
      `,
      [req.params.postid, req.headers.username],
    ];
  },

  updatePost: (req) => {
    return [
      `
      UPDATE posts p
      SET 
        p.owner_id = p.owner_id
        ${req.body.title ? `, p.title = ${mysql.escape(`${req.body.title}`)}` : ''}
        ${req.body.url ? `, p.url = ${mysql.escape(`${req.body.url}`)}` : ''}
      WHERE
	      p.post_id = ?
        AND p.owner_id = (
          SELECT u.user_id 
          FROM users AS u 
          WHERE u.username = ?
          )
      ;
      `,
      [req.params.postid, req.headers.username],
    ];
  },
  votePost: (req) => {
    return [
      `
      INSERT INTO votes (user_id, post_id, vote) 
      VALUES (
        (
          SELECT u.user_id 
          FROM users AS u 
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
  deletePost: (req) => {
    return [
      `
      UPDATE posts p
      SET 
        p.is_deleted = 1
      WHERE
        p.is_deleted = 0
        AND p.post_id = ?
        AND p.owner_id = (
          SELECT u.user_id 
          FROM users AS u 
          WHERE u.username = ?
          )
      ;
      `,
      [req.params.postid, req.headers.username],
    ];
  },
  maintainScores: (req) => {
    return [
      `
      UPDATE posts p
      LEFT JOIN 
      (
        SELECT post_id, sum(votes.vote) AS Vscore 
          FROM votes
        GROUP BY votes.post_id
      ) AS v on p.post_id = v.post_id
      SET p.score = ifnull(Vscore,0)
      WHERE p.is_deleted = 0
      ${req.params.postid ? `AND p.post_id = ${mysql.escape(`${req.params.postid}`)}` : ''}
      ;
      `,
    ];
  },
};
