// Create a method that decrypts duplicated-chars.txt

export {};
declare function require(name: string);
const fs = require('fs');

function deDoubler(inputPath: string): string {
  try {
    return fs
      .readFileSync(inputPath, 'utf-8')
      .split('')
      .filter((char, index, arr) => {
        if (index === arr.length - 1) return false;
        else if (char !== arr[index + 1]) return true;
        else return false;
      })
      .join(``);
  } catch (error) {
    console.log('Sorry, no luck this time.');
  }
}

console.log(deDoubler('fileDepo/duplicated-chars.txt'));
