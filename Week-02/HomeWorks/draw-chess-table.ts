"use strict";

// Create a program that draws a chess table like this
//
// % % % %
//  % % % %
// % % % %
//  % % % %
// % % % %
//  % % % %
// % % % %
//  % % % %
//
// L:8*8 ,

let full: string = "██",
  empty: string = "  ";
for (let n: number = 1, swapper: boolean = true; n <= 8; n += 1) {
  let lineDraw: string = ``;
  for (let y: number = 1; y <= 8; y += 1) {
    if (swapper) {
      lineDraw += full;
    } else {
      lineDraw += empty;
    }
    swapper = !swapper;
  }
  console.log(lineDraw);
  swapper = !swapper;
}
