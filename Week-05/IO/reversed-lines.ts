// Create a method that decrypts reversed-lines.txt

export {};
declare function require(name: string);
const fs = require('fs');

function lineReverser(inputPath: string): string {
  try {
    return fs
      .readFileSync(inputPath, 'utf-8')
      .split('\n')
      .map((line) => {
        return line.split('').reverse().join(``);
      })
      .join(`\n`);
  } catch (error) {
    return 'Sorry, no luck this time.';
    //console.log('Sorry, no luck this time.');
  }
}

console.log(lineReverser('fileDepo/reversed-lines.txt'));
