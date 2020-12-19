'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// need: resolution, dimensions , ..
ctx.canvas.height=500;
ctx.canvas.width=500;

drawLinePlay();

function drawLinePlay (
  canvas:HTMLCanvasElement = document.querySelector('.main-canvas') as HTMLCanvasElement,
  ctx:CanvasRenderingContext2D = canvas.getContext('2d'),
  padding:number=10,
  cUo:[number,number]=[canvas.width-padding,padding], //Coordinate of upper start
  cUx:[number,number]=[canvas.width*0.15,padding], //Coordinate of upper left bound
  cUy:[number,number]=[canvas.width-padding,canvas.height*0.95], //Coordinate of upper right bound
  cLo:[number,number]=[padding , canvas.height-padding], //Coordinate of upper start
  cLx:[number,number]=[canvas.width*0.95,padding], //Coordinate of upper left bound
  cLy:[number,number]=[padding,canvas.height*0.15], //Coordinate of upper right bound
  steps:number=20,
  rUh:number=(cUo[0]-cUx[0])/steps, // resolution upper Horizontal
  rUv:number=(cUy[1]-cUo[1])/steps, // rH, // resolution upper Vertical
  rLh:number=(cLo[0]+cLx[0])/steps, // resolution lower Horizontal
  rLv:number=(cLo[1]-cLy[1])/steps, // rH, // resolution lower Vertical
):void{
  // upper right corner
  for (let i:number=1; i< steps; i++){
    ctx.beginPath();
    ctx.moveTo(cUo[0]-i*rUh,cUo[1]);
    ctx.lineTo(cUy[0],cUy[1]-i*rUv);
    ctx.strokeStyle='purple';
    ctx.stroke();
  }
  //lower left corner
  for (let i:number=1; i< steps; i++){
    ctx.beginPath();
    ctx.moveTo(cLo[0]+i*rLh,cLo[1]);
    ctx.lineTo(cLy[0],cLy[1]+i*rLv);
    ctx.strokeStyle='green';
    ctx.stroke();
  }
}