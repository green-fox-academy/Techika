'use strict';

// Write a program that prints the following fruits:
// apple -> immediately
// pear -> after 1 seconds
// melon -> after 3 seconds
// grapes -> after 5 seconds

console.log('apple');
console.time('pear');
console.time('melon');
console.time('grapes');

setTimeout(() => {
  console.timeEnd('pear');
}, 1000);

setTimeout(() => {
  console.timeEnd('melon');
}, 3000);

setTimeout(() => {
  console.timeEnd('grapes');
}, 5000);
