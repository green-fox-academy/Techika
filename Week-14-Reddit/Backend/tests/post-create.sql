INSERT INTO `reddit`.`posts` 
  (`title`, `url`, `owner_id`) 
VALUES
	('xx1',  'www.dfgdf', (NULLIF((
		select u.user_id 
    from reddit.users as u 
    where u.username = ?
    ),''))
)
;