// Create a method that find the 5 most common lottery numbers in lottery.csv

export {};
const fs = require('fs');

function topLotteryNumbers(filePath: string) {
  try {
    let lottoDb: string[] = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    let numberCounter: number[] = [];
  } catch (error) {}
}
