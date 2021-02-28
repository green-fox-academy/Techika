// define(['require', 'dependency'], function (require, factory) {
//   'use strict';

// });
// import { createRequire } from 'module';
// const require = createRequire(import.meta.url);
// const fs = require('fs');
// const pictureNames = fs.readdirSync('./gallery');
// console.log(pictureNames);

const imageNames = ['oaktree.jpg', 'bunny.jpg', 'fox.jpg', 'gekko.jpg', 'hotdog.jpg'];
window.onload = function () {
  const thumbnailTemplate = document.getElementById('thumbnail_0');
  imageNames.forEach((picture, index) => {
    const tempNode = thumbnailTemplate.cloneNode(true);
    tempNode.getElementsByClassName('arrow-up').id = 'upArrow_' + 1;
  });
  document.getElementById('thumbnailContainer').appendChild(thumbnailTemplate.cloneNode(true));
  document.getElementById('thumbnailContainer').appendChild(thumbnailTemplate.cloneNode(true));
  document.getElementById('thumbnailContainer').appendChild(thumbnailTemplate.cloneNode(true));
  document.getElementById('thumbPic_0').src = './gallery/oaktree.jpg';
};

// thumbnailTemplate.getElementById('thumbPic_0').src = 'gallery/oaktree.jpg';
// document.getElementById("imageid").src="../template/save.png";
function pageLeft() {
  alert('scroll left');
}

function pageRight() {
  alert('scroll right');
}
