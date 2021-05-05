import postTemplate from './assets/html-snippets/post-node-template.js';

window.onload = () => {
  const postContainer = document.getElementById('posts-container');

  fetch('http://localhost:8080/posts')
    .then((response) => response.json())
    .then((resObj) => {
      resObj.forEach((post) => {
        postContainer.innerHTML += postTemplate(post);
      });
    });
};
