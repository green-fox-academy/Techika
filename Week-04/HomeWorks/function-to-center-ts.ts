'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Create a function that draws a single line and takes 2 parameters:
// The x and y coordinates of the line's starting point
// and draws a line from that point to the center of the canvas.
// Fill the canvas with lines from the edges, every 20 px, to the center.


for (let times=0; times<=canvas.width; times+=20){
    if (times>canvas.width) times=canvas.width;
    drawMidCross(times,0);
    drawMidCross(times,canvas.height);
    //drawMidCross(0,times); optional fun
    //drawMidCross(canvas.width,times);
}


function drawMidCross(coordX:number,coordY:number):void{
    ctx.moveTo(coordX,coordY);
    ctx.beginPath;
    ctx.lineTo(canvas.width/2,canvas.height/2);
    ctx.stroke();
}