'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Draw the night sky:
//  - The background should be black ✓
//  - The stars should be small squares ✓ (envelope stars ✓)
//  - The stars should have random positions on the canvas
//  - The stars should have random color (some shade of grey) 

ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvas.width, canvas.height);

const stars = [];

function randomGray():string {
  let value:number = Math.random()*255;
  return (`rgb(${value},${value},${value})`)
}


/**
 * 
 * @param canvas :Passing the HTML canvas element (default'.main-canvas')
 * @param ctx :passing the rendering engine (default: '2d')
 * @param o :Origo coordinates (default: canvas midpoint )
 * @param h :Height (default: 8)
 * @param sH :Slope Horizontal (default: 1)
 * @param sV :Slope vertica (default: = sH)
 * @param rH :Resolution Horizontal (default: 10)
 * @param rV :Resolution Vertical (default: =rH)
 */
function drawEnvelopeStar (
{ canvas = document.querySelector('.main-canvas') as HTMLCanvasElement
  , ctx = canvas.getContext('2d')
  , o = [canvas.width / 2, canvas.height / 2]
  , h = 8
  , sH = 1
  , sV = sH
  , rH = 1
  , rV = rH
  , color = 'black'
}: { canvas?: HTMLCanvasElement
  ; ctx?: CanvasRenderingContext2D
  ; o?: [number, number]
  ; h?: number
  ; sH?: number
  ; sV?: number
  ; rH?: number
  ; rV?: number
  ; color?: string
  ; } = {}
):void{
  for (let i:number=0; i< h/sH; i+=rH){
  ctx.beginPath();
  ctx.moveTo(o[0],o[1]-h+i);
  ctx.lineTo(o[0]-sH*i,o[1]);
  ctx.lineTo(o[0],o[1]+h-i);
  ctx.lineTo(o[0]+sH*i,o[1]);
  ctx.closePath();
  ctx.strokeStyle=color;
  ctx.stroke();
  }
}

function randomCoordinates():{randomX:number,randomY:number} {
  const randomX = Math.round(8+ (canvas.width - 8) * Math.random());
  const randomY = Math.round(8 + (canvas.height - 8) * Math.random());

  for (let i = 0; i < stars.length; i++) {
      if (
          randomX > stars[i].x - 11 && randomX < stars[i].x +11
          && randomY > stars[i].y - 11 && randomY < stars[i].y + 11
      ) {
          return randomCoordinates();
      }
  }

  return{
      randomX,
      randomY
  };
}

setInterval( function() {
  const { randomX, randomY } = randomCoordinates();
  stars.push( {
      x: randomX,
      y: randomY
  } );
  drawEnvelopeStar({
    o:[randomX,randomY],
    color:randomGray(),
  });
  
  setTimeout(function () {
    drawEnvelopeStar({
      o:[randomX,randomY],
      color:'black',
    })
    stars.splice(stars.findIndex(star => star.x === randomX && star.y === randomY), 1);
  }, 6000);
}, 50 );