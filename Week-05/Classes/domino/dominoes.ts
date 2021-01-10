import { Domino } from './domino';

function initializeDominoes(): Domino[] {
  let dominoes = [];
  dominoes.push(new Domino(5, 2));
  dominoes.push(new Domino(4, 6));
  dominoes.push(new Domino(1, 5));
  dominoes.push(new Domino(6, 7));
  dominoes.push(new Domino(2, 4));
  dominoes.push(new Domino(7, 1));
  return dominoes;
}

function print(dominoes: Domino[]) {
  dominoes.forEach(function (value) {
    console.log(value);
  });
}

let dominoes: Domino[] = initializeDominoes();
/** You have the list of Dominoes */
/** Order them into one snake where the adjacent dominoes have the same numbers on their adjacent sides */
/** eg: [2, 4], [4, 3], [3, 5] ... */

function solveDominoes(dominoes: Domino[]): void {
  for (let d: number = 1; d <= dominoes.length - 2; d++) {
    for (
      let mod: number = dominoes.length - 1;
      dominoes[d].values[0] !== dominoes[d - 1].values[1];
      mod--
    )
      [dominoes[d], dominoes[mod]] = [dominoes[mod], dominoes[d]];
  }
}

solveDominoes(dominoes);
print(dominoes);

// note: error handling could be:
// if (mod === d) {
//   console.log('no solution');
//   break;
// }
