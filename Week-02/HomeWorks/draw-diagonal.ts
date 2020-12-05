// Write a program that draws a
// square like this:
//
// %%%%%%
// %%   %
// % %  %
// %  % %
// %   %%
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
        repeat(" ", margin) +
          pencil +
          leveler(line - 1, lines - 2, pencil, paper) +
          pencil
      );
    }
  }
}

function leveler(
  inline: number,
  inWidth: number,
  pencil: string,
  fill: string
): string {
  let output: string = "";
  for (let k: number = 1; k <= inWidth; k = k + 1) {
    if (inline === k) {
      output += pencil;
    } else {
      output += fill;
    }
  }
  return output;
}

function repeat(inString: string, times: number) {
  let repeatedString: string = "";
  while (times > 0) {
    repeatedString += inString;
    times--;
  }
  return repeatedString;
}

//Console:
squaredraw(20, "%", " ", 5);
