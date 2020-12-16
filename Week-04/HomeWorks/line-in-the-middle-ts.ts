  
'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// draw a red horizontal line to the canvas' middle.
ctx.moveTo(0,canvas.height/2);
ctx.beginPath;
ctx.lineTo(canvas.width,canvas.height/2);
ctx.stroke();
// draw a green vertical line to the canvas' middle.
ctx.moveTo(canvas.width/2,0);
ctx.beginPath;
ctx.lineTo(canvas.width/2,canvas.height);
ctx.stroke();