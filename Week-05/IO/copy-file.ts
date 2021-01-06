// Write a function that copies the contents of a file into another
// It should take the filenames as parameters
// It should return a boolean that shows if the copy was successful

export {};
declare function require(name: string);
const fs = require('fs');

function carbonCopy(source: string, target: string): boolean {
  try {
    fs.writeFileSync(target, fs.readFileSync(source, 'utf-8'));
  } catch (error) {
    return false;
  }
  return true;
}

console.log(carbonCopy('fileDepo/my-file.txt', 'fileDepo/carbonCopy.txt'));
