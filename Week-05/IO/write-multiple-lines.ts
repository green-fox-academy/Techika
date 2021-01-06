// Create a function that takes 3 parameters: a path, a word and a number
// and is able to write into a file.
// The path parameter should be a string that describes the location of the file you wish to modify
// The word parameter should also be a string that will be written to the file as individual lines
// The number parameter should describe how many lines the file should have.
// If the word is 'apple' and the number is 5, it should write 5 lines
// into the file and each line should read 'apple'
// The function should not raise any errors if it could not write the file.

export {};

declare function require(name: string);
const fs = require('fs');

function insertAsLines(path: string, word: string, times: number): void {
  try {
    fs.readFileSync(path);
    for (let t = times; t >= 1; t--) {
      fs.appendFileSync(path, '\n' + word);
    }
    console.log(fs.readFileSync(path, 'utf-8'));
  } catch (error) {
    // this will prevent the creation of non existing files by accident. (without warnign as per requirement)
  }
}

insertAsLines('multipleLines.txt', 'Apple', 4);
insertAsLines('fileDepo/multipleLines.txt', 'Apple', 5);
