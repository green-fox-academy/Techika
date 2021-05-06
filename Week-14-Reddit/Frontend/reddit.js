import templates from './assets/html-templates.js';

window.onload = () => {
  const postContainer = document.getElementById('posts-container');
  const body = document.querySelector('body');

  fetch('http://localhost:8080/posts')
    .then((response) => response.json())
    .then((resObj) => {
      resObj.forEach((postData) => {
        postContainer.innerHTML += templates.post(postData);
        postContainer.innerHTML += templates.post(postData);
        postContainer.innerHTML += templates.post(postData);
        postContainer.innerHTML += templates.post(postData);
        postContainer.innerHTML += templates.post(postData);
      });
    })
    .then(() => {
      body.innerHTML += templates.login();
    })
    .then(() => {
      body.addEventListener('click', (e) => {
        if (e.target.matches('#login')) {
          document.querySelector('.popup-wrapper').style.display = 'flex';
        } else if (e.target.matches('.login-button-stack .cancel')) {
          document.querySelector('.popup-wrapper').style.display = 'none';
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
        }
        // else if (e.target.matches('.login-button-stack .cancel')) {}
      });
      body.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('submittign');
        if (e.target.matches('#login-form')) {
          localStorage.setItem('username', e.target.username.value);
          document.querySelector('.popup-wrapper').style.display = 'none';
          document.getElementById('login').innerText = `Logged in as: [${localStorage.getItem(
            'username'
          )}]`;
        }
      });
    });
};
