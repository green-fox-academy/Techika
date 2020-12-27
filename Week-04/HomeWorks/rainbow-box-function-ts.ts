'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Create a square drawing function that takes 2 parameters:
// The square size, and the fill color,
// and draws a square of that size and color to the center of the canvas.
// Create a loop that fills the canvas with a rainbow of colored squares.


function drawColorRect(size:number,color:string):void {
  ctx.fillStyle = color;
  ctx.fillRect (canvas.width/2-size/2,canvas.height/2-size/2,size,size);
}

let rainbowColors:string[]=['red','orange','yellow','green','blue','indigo','violet'];

// 
drawColorRect(20,'red');

// function rainbowFill()

let shorterSide:number = (canvas.width <= canvas.height)? canvas.width : canvas.height;
let seventhSide:number = shorterSide/rainbowColors.length;
rainbowColors.forEach((color, index) => drawColorRect(shorterSide-index*seventhSide,color));