class CowsAndBulls {
  guessMe: number[] = [2, 3, 4, 1];
  gameState: 'playing' | 'finished' = 'playing';
  guessCount: number = 0;

  constructor() {
    //[1, 2, 3, 4].forEach(() => this.guessMe.push(Math.floor(Math.random() * 9)));
    console.log(
      'I have thought of a 4 digit positive whole number, can you guess it?\n' +
        'For game instructions read the manual'
    );
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

  inputValidation(guessText: string): [boolean, [number, number, number, number]] {
    if (guessText.length === 4) {
      const outArr: number[] = guessText.split('').reduce((out, char) => {
        if (!isNaN(Number(char))) out.push(Number(char));
        return out;
      }, []);
      if (outArr.length === 4) return [true, [outArr[0], outArr[1], outArr[2], outArr[3]]];
    }
    return [false, [null, null, null, null]];
  }
  guess(guess: string): string {
    if (this.gameState === 'finished')
      return 'Sorry, the game has already finished, clone a new one!';
    const validated: [boolean, number[]] = this.inputValidation(guess);
    if (!validated[0])
      return `Your guess "${guess}" is invalid, please provide a 4 digit positive whole number as guess`;
    this.guessCount += 1;
    const result = this.testGuess(validated[1]);
    if (result.cows === 4 && result.bulls === 0) {
      this.gameState = 'finished';
      return `Congratulations, you have guessed the correct answer in ${this.guessCount} steps!`;
    } else
      return `Attempt: ${this.guessCount} | "${guess}" | You hit ${result.cows} Cows and ${result.bulls} Bulls`;
  }
}

// const game1 = new CowsAndBulls();
// console.log(game1.guessMe);

// console.log(game1.guess(''));
// console.log(game1.guess('134'));
// console.log(game1.guess('12B4'));
// console.log(game1.guess('1.234'));
// console.log(game1.guess('1-23-4'));
// console.log(game1.guess('-1234'));
// console.log(game1.guess('1234'));
// console.log(game1.guess('3658'));
// console.log(game1.guess('2341'));
// console.log(game1.guess('4563'));

import test = require('tape');

test('CowTester - inputs', (t) => {
  const c: CowsAndBulls = new CowsAndBulls();
  t.equal(
    c.guess(''),
    'Your guess "" is invalid, please provide a 4 digit positive whole number as guess'
  );
  t.equal(
    c.guess('12B4'),
    'Your guess "12B4" is invalid, please provide a 4 digit positive whole number as guess'
  );
  t.end();
});
