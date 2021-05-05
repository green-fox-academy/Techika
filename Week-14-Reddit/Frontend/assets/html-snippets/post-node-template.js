export default (postData) => {
  const today = new Date();
  const t = postData.timestamp.split(/[-T:.]/);
  console.log(postData.timestamp);
  console.log(t);
  const stampDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
  console.log(stampDate);
  const daysSince = Math.round((today.getTime() - stampDate.getTime()) / 86400000);

  return `
  <div class="post-container">
    <div class="post-scores">
      <img class="vote up" class="arrow up" src="assets/buttons/upvote.png" />
      <span class="vote-count">${postData.score} </span>
      <img class="vote down" class="arrow down" src="assets/buttons/downvote.png" />
    </div>
    <div class="post-main-container">
      <div class="post-main-wrapper">
        <a href="${postData.url}"> <h3 class="post-title">
          ${postData.title} 
        </h3></a>
        <div class="post-metrics">Submitted ${daysSince} days ago by <span class="blue-text">${
    postData.owner == null ? 'anonymous' : postData.owner
  }</span>
    </div>
        <div class="post-buttons">
          <span class="blue-text">0 comments</span>
          <a href="">modify</a>
          <a href="">remove</a>
        </div>
      </div>
    </div>
  </div>
  `;
};
