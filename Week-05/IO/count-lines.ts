// Write a function that takes a filename as string,
// then returns the number of lines the file contains.
// It should return zero if it can't open the file, and
// should not raise any error.

export {};

declare function require(name: string);
const fs = require('fs');

function lineCounter(filename: string): number {
  try {
    return fs.readFileSync(filename, 'utf-8').split('\n').length;
  } catch (error) {
    return 0;
  }
}

console.log(lineCounter('my-file.txt'));
console.log(lineCounter('fileDepo/my-file.txt'));
