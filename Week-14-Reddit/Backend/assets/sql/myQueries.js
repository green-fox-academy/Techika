import * as mysql from 'mysql';
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
      SET p.score = v.Vscore
      ;
      `,
    ];
  },
};
