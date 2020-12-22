'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE
/*
I need: height, midpoint, resolution
*/
drawEnvelopeStar()
/**
 * 
 * @param canvas :Passing the HTML canvas element (default'.main-canvas')
 * @param ctx :passing the rendering engine (default: '2d')
 * @param o :Origo coordinates (default: canvas midpoint )
 * @param h :Height (defaul: 200)
 * @param sH :Slope Horizontal (default: 1)
 * @param sV :Slope vertica (default: = sH)
 * @param rH :Resolution Horizontal (default: 10)
 * @param rV :Resolution Vertical (default: =rH)
 */
function drawEnvelopeStar (
{ canvas = document.querySelector('.main-canvas') as HTMLCanvasElement
  , ctx = canvas.getContext('2d')
  , o = [canvas.width / 2, canvas.height / 2]
  , h = 200
  , sH = 1
  , sV = sH
  , rH = 10
  , rV = rH
}: { canvas?: HTMLCanvasElement
  ; ctx?: CanvasRenderingContext2D
  ; o?: [number, number]
  ; h?: number
  ; sH?: number
  ; sV?: number
  ; rH?: number
  ; rV?: number
  ; } = {}
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
