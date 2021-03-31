    UPDATE reddit.posts p
    LEFT JOIN 
    (
      SELECT post_id, sum(reddit.votes.vote) AS Vscore 
        FROM reddit.votes
      GROUP BY reddit.votes.post_id
    ) AS v ON p.post_id = v.post_id
    SET p.score = v.Vscore
    ;