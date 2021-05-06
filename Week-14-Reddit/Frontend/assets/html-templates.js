export default {
  post: (postData) => {
    const today = new Date();
    const t = postData.timestamp.split(/[-T:.]/);
    const stampDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
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
  },
  popupBackground: () => {},

  login: () => {
    return `
    <div class="popup-wrapper" style="display:none">
      <form action="" id="login-form" autocomplete="off">
        <h2>ACCOUNT LOGIN</h2>
        <br>
        <label>USERNAME
          <input id="username" type="text" required/>     
        </label>   
        <label>PASSWORD
          <div id="pw-container">
            <input type="password" id="password" required/><i class="far fa-eye"></i>
          </div>
          <p>Forgot Password?</p>  
        </label>
        <div class="login-button-stack">
          <button type="submit">Login</button>
          <button type="button" class="cancel">Cancel</button>
        </div>
      </form>
    </div>
    `;
  },
};
