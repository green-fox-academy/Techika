// Write a function that is able to manipulate a file
// By writing your name into it as a single line
// The file should be named "my-file.txt"
// In case the program is unable to write the file,
// It should print the following error message: "Unable to write file: my-file.txt"

export {};

declare function require(name: string);
const fs = require('fs');

function addMyName(filename: string, yourName: string): void {
  // Question:: How to do the same properly with one open?
  // fs.open(filename, 'ax+', function (err, fileReference) {
  //   fs.appendFileSync(filename, yourName);
  //   console.log(fs.readFileSync(filename));
  //   fs.close(fileReference);
  // });
  // });
  try {
    fs.readFileSync(filename);
    fs.appendFileSync(filename, '\n' + yourName);
    console.log(fs.readFileSync(filename, 'utf-8'));
  } catch (error) {
    console.log('Unable to write file: my-file.txt');
  }
}

addMyName('my-file.txt', 'Adam Bukovinszki');
addMyName('fileDepo/my-file.txt', 'Adam Bukovinszki');
