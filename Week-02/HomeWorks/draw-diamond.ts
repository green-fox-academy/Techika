/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// Write a program that draws a
// diamond like this:
//
//    *
//   ***
//  *****
// *******
//  *****
//   ***
//    *
//
// The diamond should have as many lines as lineCount is
//! ! .repeat(i) does not exist for some reason,,, !!

function diamondraw(
  lines: number,
  pencil: string,
  paper: string,
  margin: number
): void {
  for (let line = 0; line < lines; line += 1) {
    const blanks: number = Math.abs((lines - 1) / 2 - line);
    console.log(
      repeat(" ", margin),
      repeat(paper, blanks),
      repeat(pencil, lines - 2 * blanks),
      repeat(paper, blanks)
      //paper.repeat(blanks)
    );
  }
}

function repeat(inString: string, times: number) {
  let repeatedString: string = "";
  while (times > 0) {
    repeatedString += inString;
    times -= 1;
  }
  return repeatedString;
}

//Console:
diamondraw(11, "*", "-", 30);
