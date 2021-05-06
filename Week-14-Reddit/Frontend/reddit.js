import templates from './assets/html-templates.js';

window.onload = () => {
  const postContainer = document.getElementById('posts-container');
  const body = document.querySelector('body');

  if (localStorage.getItem('username')) {
    document.getElementById('login').textContent = `
    Logged in as: [${localStorage.getItem('username')}]`;
  }

  fetch('http://localhost:8080/posts')
    .then((response) => response.json())
    .then((resObj) => {
      resObj.forEach((postData) => {
        postContainer.innerHTML += templates.post(postData);
      });
    })
    .then(() => {
      body.innerHTML += templates.login();
      body.innerHTML += templates.newPost();
    })
    .then(() => {
      body.addEventListener('click', (e) => {
        if (e.target.matches('#login')) {
          document.querySelector('.login.popup-wrapper').style.display = 'flex';
        } else if (e.target.matches('.button-stack .cancel')) {
          document.querySelectorAll('.popup-wrapper').forEach((element) => {
            element.style.display = 'none';
          });
        } else if (e.target.matches('.far')) {
          const eye = document.querySelector('.far');
          const pwInput = document.getElementById('password');
          if (pwInput.type === 'text') {
            pwInput.type = 'password';
            eye.classList.replace('fa-eye-slash', 'fa-eye');
          } else {
            pwInput.type = 'text';
            eye.classList.replace('fa-eye', 'fa-eye-slash');
          }
        } else if (e.target.closest('#submit')) {
          document.querySelector('.new-post.popup-wrapper').style.display = 'flex';
        } else if (e.target.matches('.vote')) {
          const voteDirection = e.target.matches('.down') ? 'downvote' : 'upvote';
          const postID = e.target.closest('.post-container').getAttribute('post-id');
          fetch(`http://localhost:8080/posts/${postID}/${voteDirection}`, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              username: localStorage.getItem('username'),
            },
          })
            .then((res) => res.json())
            .then((resObj) => {
              e.target.parentNode.children[1].textContent = resObj[0].score;
            });
        } else {
          console.log(e.target);
        }

        // else if (e.target.matches('.login-button-stack .cancel')) {}
      });
      body.addEventListener('submit', (e) => {
        e.preventDefault();
        if (e.target.matches('#login-form')) {
          localStorage.setItem('username', e.target.username.value);
          document.querySelector('.popup-wrapper').style.display = 'none';
          document.getElementById('login').innerText = `
          Logged in as: [${localStorage.getItem('username')}]`;
        }
        if (e.target.matches('#submit-form')) {
          const username = localStorage.getItem('username');
          const title = e.target.title.value;
          const url = e.target.url.value;

          fetch('http://localhost:8080/posts', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              username: username,
            },
            body: JSON.stringify({
              title: title,
              url: url,
            }),
          })
            .then((res) => res.json())
            .then((resObj) => {
              document.querySelector('.new-post.popup-wrapper').style.display = 'none';
            });
        }
      });
    });
};
