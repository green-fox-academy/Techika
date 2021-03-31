export function queryPosts() {
  return `
  select 
	p.post_id as id, 
    p.title, p.url, 
    p.timestamp, 
    p.score,  
    u.username as owner, 
    w.vote as vote from reddit.posts as p
left join reddit.users as u on p.owner_id = u.user_id
left join reddit.votes as w on w.post_id = p.post_id 
and w.user_id = (
	select j.user_id from reddit.users as j
    where j.username = null
)
where 
	p.is_deleted = 0
	AND p.title = 'first post'
group by p.post_id
  `;
}
