'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE
/*
I need: height, midpoint, resolution
*/
drawEnvelopeStar();

function drawEnvelopeStar (
  canvas:HTMLCanvasElement = document.querySelector('.main-canvas') as HTMLCanvasElement,
  ctx:CanvasRenderingContext2D = canvas.getContext('2d'),
  o:[number,number]=[canvas.width/2,canvas.height/2], //Origo
  h:number=200, //height
  sH:number=1, // slope Horizontal
  sV:number=sH, // slope Vertical
  rH:number=10, // resolution Horizontal
  rV:number=rH, // resolution Vertical
):void{
  for (let i:number=0; i< h/sH; i+=rH){
    ctx.beginPath();
    ctx.moveTo(o[0],o[1]-h+i);
    ctx.lineTo(o[0]-sH*i,o[1]);
    ctx.lineTo(o[0],o[1]+h-i);
    ctx.lineTo(o[0]+sH*i,o[1]);
    ctx.closePath();
    ctx.stroke();
  }
}
