export default {
  post: (postData) => {
    const today = new Date();
    const t = postData.timestamp.split(/[-T:.]/);
    const stampDate = new Date(t[0], t[1] - 1, t[2], t[3], t[4], t[5]);
    const daysSince = Math.round((today.getTime() - stampDate.getTime()) / 86400000);

    return `
    <div class="post-container">
      <div class="post-scores">
        <img class="vote arrow up" src="assets/buttons/upvote.png" />
        <span class="vote-count">${postData.score} </span>
        <img class="vote arrow down" src="assets/buttons/downvote.png" />
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
    <div class="login popup-wrapper" style="display:none">
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
        <div class="login button-stack">
          <button type="button" class="cancel">Cancel</button>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    `;
  },
  newPost: () => {
    return `
    <div class="new-post popup-wrapper" style="display:none">
      <form action="" id="submit-form" autocomplete="off">
        <h2>SUBMIT POST</h2>
        <br>
        <label>*title
          <input id="title" type="text" name="title" required/>     
        </label>   
        <label>URL
          <input id="url" type="url" name="url" required/>
        </label>
        <div class="submit button-stack">
          <button type="button" class="cancel">Cancel</button>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
    `;
  },
};
