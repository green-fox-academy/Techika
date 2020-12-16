'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// draw a box that has different colored lines on each edge.

function randomColor():string{
  let colors:string[]=['blue','red','purple','brown','yellow','pink'];
  return (colors[Math.round(Math.random()*colors.length-1)]);
}

function strokeInStyle(xGoal:number,yGoal:number,xOrigin?:number,yOrigin?:number):void{
 if (xOrigin !== undefined){
   ctx.moveTo(xOrigin,yOrigin);
 }
  ctx.beginPath;
  ctx.strokeStyle=randomColor();
  ctx.lineTo(xGoal,yGoal);
  ctx.stroke();
}

strokeInStyle(100,50,50,50);
strokeInStyle(100,100);
strokeInStyle(50,100);
strokeInStyle(50,50);
