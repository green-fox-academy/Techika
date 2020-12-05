// Write a program that draws a
// pyramid like this:
//
//    *
//   ***
//  *****
// *******
//
// The pyramid should have as many lines as lineCount is

function repeat(inString: string, times: number) {
  let repeatedString: string = "";
  while (times > 0) {
    repeatedString += inString;
    times--;
  }
  return repeatedString;
}

function pyramid(
  lines: number,
  pencil: string,
  paper: string,
  margin: number
): void {
  for (let line = 1; line < lines; line += 1) {
    const blanks: number = Math.round((2 * lines - 1) / 2 - line); //(lines - 1) / 2 - line;
    console.log(
      repeat(" ", margin) +
        repeat(paper, blanks) +
        repeat(pencil, 2 * lines - 1 - 2 * blanks) +
        repeat(paper, blanks)
    );
  }
}
// Console:
pyramid(7, "%", " ", 30);
