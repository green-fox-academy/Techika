//Write a function that finds the largest element of an array using recursion.

function maxFinder(x: number[]): number {
  if (x.length === 1) return x[0];
  if (x[x.length - 1] < x[x.length - 2]) x.pop();
  else {
    [x[x.length - 1], x[x.length - 2]] = [x[x.length - 2], x[x.length - 1]];
    x.pop();
  }
  maxFinder(x);
  return x[0];
}

console.log(maxFinder([2, 3, 34, 21, 3]));
console.log(maxFinder([2]));
console.log(maxFinder([11, 3, 22, 21, 55]));
