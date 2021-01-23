class CowsAndBulls {
  guessMe: number[] = [2, 3, 4, 1];
  gameState: 'playing' | 'finished' = 'playing';
  guessCount: number = 0;

  constructor() {
    //[1, 2, 3, 4].forEach(() => this.guessMe.push(Math.floor(Math.random() * 9)));
    console.log('I have thought of a 4 digit nuber, can you guess it?');
  }

  testGuess(guess: number[]): { cows: number; bulls: number } {
    const cows: number = this.guessMe
      .map((value, i) => {
        return value === guess[i] ? true : false;
      })
      .filter((a) => a === true).length;

    this.guessMe.forEach((num, i) => {
      guess.some((num2, i2) => {
        if (num === num2) {
          guess.splice(i2, 1);
          return true;
        }
        return false;
      });
    });
    const bulls: number = 4 - guess.length - cows;
    return { cows: cows, bulls: bulls };
  }

  guess(guess: [number, number, number, number]): string {
    if (this.gameState === 'finished')
      return 'Sorry, the game has already finished, clone a new one!';
    this.guessCount += 1;
    const result = this.testGuess(guess);
    if (result.cows === 4 && result.bulls === 0) {
      this.gameState = 'finished';
      return `Congratulations, you have guessed the correct answer in ${this.guessCount} steps!`;
    } else
      return `Attempt: ${this.guessCount} | You hit ${result.cows} Cows and ${result.bulls} Bulls`;
  }
}

const game1 = new CowsAndBulls();
console.log(game1.guessMe);
//console.log(game1.testGuess([1, 2, 3, 4]));
console.log(game1.guess([22, 44, 55, 66]));
//console.log(game1.guess([1, 2, 3]));
//console.log(game1.guess([1, 2, 3, 9, 4]));
//console.log(game1.guess([1, -2, 3, -4]));
console.log(game1.guess([1, 2, 2, 4]));
console.log(game1.guess([3, 6, 5, 8]));
console.log(game1.guess([2, 3, 4, 1]));
console.log(game1.guess([4, 5, 6, 3]));

// Need to test:
// [ 4, 0, 7, 1 ]
// You hit 0 Cows and 0 Bulls

// import test = require('tape');

// test('AppleTester', (t) => {
//   const a: AppleType = new AppleType();
//   t.equal(a.getApple(), 'Apple');
//   t.end();
// });
