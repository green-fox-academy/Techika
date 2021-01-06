// Create a method that decrypts reversed-order.txt

export {};
declare function require(name: string);
const fs = require('fs');

function orderReverser(inputPath: string): string {
  try {
    return fs.readFileSync(inputPath, 'utf-8').split('\n').reverse().join(`\n`);
  } catch (error) {
    return 'Sorry, no luck this time.';
    //console.log('Sorry, no luck this time.');
  }
}

console.log(orderReverser('fileDepo/reversed-order.txt'));
