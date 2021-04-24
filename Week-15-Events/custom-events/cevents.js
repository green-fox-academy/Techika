'use strict';

const myDiv = document.querySelector('div');

const leftSideClick = new Event('left-side-click');
const rightSideClick = new Event('right-side-click');

myDiv.addEventListener('click', (eve) => {
  const box = eve.target;
  const cliX = eve.pageX - box.offsetLeft;
  if (cliX >= box.offsetLeft + box.getBoundingClientRect().width / 2) {
    myDiv.dispatchEvent(rightSideClick);
  } else {
    myDiv.dispatchEvent(leftSideClick);
  }
});

myDiv.addEventListener('left-side-click', (ev) => {
  ev.target.style.backgroundColor = 'yellow';
});

myDiv.addEventListener('right-side-click', (ev) => {
  ev.target.style.backgroundColor = 'blue';
});
