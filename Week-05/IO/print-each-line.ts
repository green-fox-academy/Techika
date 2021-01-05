// Write a program that opens a file called "my-file.txt", then prints
// each line from the file.
// If the program is unable to read the file (for example it does not exist),
// then it should print the following error message: "Unable to read file: my-file.txt"

export {};

declare function require(name: string);
const fs = require('fs');

function textLiner(filename: string): void {
  try {
    fs.readFileSync(filename, 'utf-8')
      .split('\n')
      .forEach((element) => {
        console.log(element);
      });
  } catch (error) {
    console.log('Unable to read file: my-file.txt');
  }
}

textLiner('my-file.txt');
textLiner('fileDepo/my-file.txt');
