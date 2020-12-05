"use strict";

let lineCount: number = 6;

// Write a program that draws a square like this:
//
// %%%%%%
// %    %
// %    %
// %    %
// %    %
// %%%%%%
//
// The square should have as many lines as lineCount is
function squaredraw(
  lines: number,
  pencil: string,
  paper: string,
  margin: number
): void {
  for (let line = 1; line <= lines; line += 1) {
    if (line === 1 || line === lines) {
      console.log(repeat(" ", margin) + repeat(pencil, lines));
    } else {
      console.log(
        repeat(" ", margin) + pencil + repeat(paper, lines - 2) + pencil
      );
    }
  }
}

function repeat(inString: string, times: number) {
  let repeatedString: string = "";
  while (times > 0) {
    repeatedString += inString;
    times--;
  }
  return repeatedString;
}

squaredraw(11, "%", " ", 30);
