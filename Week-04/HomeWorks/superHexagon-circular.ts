'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Fill the canvas with a checkerboard pattern.

/* Preparation: 
I need linewidth and cell matrix a*b
OR lets strat fron middle, and make symmetric circles.
**Dzoval ebben a megkozelitesben koncentrikusan probalkoztam... de most kicsit feladom, mert sok issue van vele.

*/
function Hexagon(
  canvas:HTMLCanvasElement,
  ctx:CanvasRenderingContext2D,
  cP:[number,number]=[canvas.width/2,canvas.height/2],
  radius:number=15,
  circles:number=3,
  ){
    for (let l=0; l<=circles; l++)
      cP[0]+=l*radius
    for (let n=0; n<=6; n++){
    ctx.moveTo(
      cP[0] + radius * Math.cos(0), // 1 
      cP[1] + radius * Math.sin(0) // 0
      );
    ctx.beginPath();
    
    for (let side=0; side < 7; side++) {
      ctx.lineTo(
        cP[0]  + radius * Math.cos(side * 2 * Math.PI / 6), 
        cP[1]  + radius * Math.sin(side * 2 * Math.PI / 6)
        );
    }
    ctx.stroke();
  }
}

Hexagon(canvas,ctx);
