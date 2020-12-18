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
function drawHexagon(
  canvas:HTMLCanvasElement,
  ctx:CanvasRenderingContext2D,
  cP:[number,number]=[150,100],
  radius:number=20,
  hexPerSide:number=4,
  ):void{
    for (let l=0; l<(hexPerSide*2-1); l++){
      let cC:number[]=cP.slice();
      cC[0]+=l*1.5*radius;
      cC[1]-=((hexPerSide*2)-Math.abs(-hexPerSide+l+1)*2*(Math.sqrt(3)/2*radius))*0.5;
      for (let n=0; n < (hexPerSide*2-1)-Math.abs(hexPerSide-1-l); n++){
        cC[1]+=2*(Math.sqrt(3)/2*radius);
        ctx.moveTo(
        cC[0] + radius * Math.cos(0), // 1 
        cC[1] + radius * Math.sin(0) // 0
        );
        ctx.beginPath(); 
        for (let side=0; side < 7; side++) {
          ctx.lineTo(
            cC[0]  + radius * Math.cos(side * 2 * Math.PI / 6), 
            cC[1]  + radius * Math.sin(side * 2 * Math.PI / 6)
          );
        }
      ctx.stroke();
    }
  }
}

drawHexagon(canvas,ctx);