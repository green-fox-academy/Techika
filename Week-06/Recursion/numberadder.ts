// Write a recursive function that takes one parameter: n and adds numbers from 1 to n.

function numberAdder(n: number): number {
  console.log(n);
  switch (true) {
    case n > 1:
      return n + numberAdder(n - 1);
    case n < 1:
      return n + numberAdder(n + 1);
    default:
      return n;
  }
}

console.log(numberAdder(-10));
