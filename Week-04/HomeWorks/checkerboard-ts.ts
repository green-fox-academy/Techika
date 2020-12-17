'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Fill the canvas with a checkerboard pattern.

/* Preparation: 

I can make it dynamic, by asking what should be the dimension of the pattern
*/

function chessTabler(
  canvas:HTMLCanvasElement,
  ctx:CanvasRenderingContext2D,
  timesWidth:number=8,
  timesHeight:number=8,
  color1:string='white',
  color2:string='black'
  ){
    const blockWidth:number=canvas.width/timesWidth;
    const blockHeight:number=canvas.height/timesHeight;
    let startColorH:number=1;
    for (let h=0; h<=timesHeight; h++){
      let startColorW:number=startColorH;
      for (let w=0; w<=timesWidth; w++){
        ctx.fillStyle = (startColorW===1 ? color1 : color2);
        ctx.fillRect(w*blockWidth,h*blockHeight,blockWidth,blockHeight);
        startColorW = (startColorW===1 ? 2 : 1);
      }
      startColorH = (startColorH===1 ? 2 : 1);
    }
  }

chessTabler(canvas,ctx,8,8,'orange','purple');
