'use strict';

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Create a function that takes 1 parameter:
// A list of [x, y] points
// and connects them with green lines.
// Connect these to get a box: [[10, 10], [290,  10], [290, 290], [10, 290]]
// Connect these: [[50, 100], [70, 70], [80, 90], [90, 90], [100, 70],
// [120, 100], [85, 130], [50, 100]]



// interface coordinateStack {
//   ['game':[[number,number]]];
// }

const connectGames={
  game1 : [[10, 10], [290, 10], [290, 290], [10, 290]],
  game2 : [[50, 100], [70, 70], [80, 90], [90, 90], [100, 70], [120, 100], [85, 130], [50, 100]]
};

ctx.fillStyle='black';
ctx.fillRect(0,0,canvas.width,canvas.height);
//connector(connectGames['game1'],'green');
connector(connectGames['game2'],'green');

function connector(game:number[][],color:string):void{
  ctx.moveTo(game[0][0],game[0][1]);
  ctx.beginPath;
  for (let stop = 1; stop < game.length; stop++){
    ctx.lineTo(game[stop][0],game[stop][1],);
  }
  //ctx.strokeStyle=(color);
  ctx.fillStyle=(color);
  //ctx.stroke();
  ctx.fill();
}
