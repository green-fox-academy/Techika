'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Fill the canvas with a checkerboard pattern.

/* Preparation: 
I need 3 coordinates for the 3 corners and one line ratio
drawing lines between them.. will be an interesting solution...

*/
function drawPiramid(
  canvas:HTMLCanvasElement,
  ctx:CanvasRenderingContext2D,
  pA:[number,number]=[canvas.width/2,50],
  pB:[number,number]=[canvas.width-50,canvas.height-50],
  pC:[number,number]=[50,canvas.height-50],
  lineRatio:number=21, /*exact for excercise:21*/
  ):void{
    ctx.moveTo(...pA);
    ctx.beginPath;
    ctx.lineTo(...pB);
    ctx.lineTo(...pC);
    ctx.closePath();
    ctx.stroke();
    for (let lines=1; lines<lineRatio ; lines++){
      let odaX0:number=pA[0] - ((pA[0]-pC[0]) / lineRatio)*lines;
      let odaY0:number=pA[1] + ((pC[1]-pA[1]) / lineRatio)*lines;
      let odaX1:number=pA[0] + ((pB[0]-pA[0]) / lineRatio)*lines;
      let odaY1:number=pA[1] + ((pB[1]-pA[1]) / lineRatio)*lines;
      let odaX2:number=pC[0] + ((pB[0]-pC[0]) / lineRatio)*(lineRatio-lines);
      let odaY2:number=pC[1] + ((pB[1]-pC[1]) / lineRatio)*(lineRatio-lines);
      let odaX3:number=pB[0] - ((pB[0]-pA[0]) / lineRatio)*lines;//(lineRatio-lines);
      let odaY3:number=pB[1] - ((pB[1]-pA[1]) / lineRatio)*lines;//(lineRatio-lines);
      //console.log(odaX0,odaY0,odaX1,odaY1);
      ctx.moveTo(odaX1,odaY1);
      ctx.beginPath;
      ctx.lineTo(odaX0,odaY0);
      ctx.lineTo(odaX2,odaY2);
      ctx.lineTo(odaX3,odaY3);
      ctx.stroke();
    } 
}

drawPiramid(canvas,ctx);
