//Bunnies:
// We have a number of bunnies and each bunny has two big floppy ears.
// We want to compute the total number of ears across all the bunnies recursively (without loops or multiplication).

function bunnyEars(bunnyCount: number): number {
  if (bunnyCount === 0) return 0;
  return 2 + bunnyEars(bunnyCount - 1);
}
console.log(bunnyEars(34));

// I totally don't understand this!!!
// If we have the input of 123, the number of ears would be 123*2 ... what recursion is needed here/why?

//Bunnies again (makes more sense)
// We have bunnies standing in a line, numbered 1, 2, ... The odd bunnies (1, 3, ..) have the normal 2 ears.
// The even bunnies (2, 4, ..) we'll say have 3 ears, because they each have a raised foot.
// Recursively return the number of "ears" in the bunny line 1, 2, ... n (without loops or multiplication).

function bunnyHop(bunnyCount: number): number {
  if (bunnyCount === 0) return 0;
  if (bunnyCount % 2 === 0) return 3 + bunnyHop(bunnyCount - 1);
  else return 2 + bunnyHop(bunnyCount - 1);
}

console.log(bunnyHop(1)); // 2
console.log(bunnyHop(2)); // 5
console.log(bunnyHop(3)); // 7
console.log(bunnyHop(4)); // 10
console.log(bunnyHop(5)); // 12
console.log(bunnyHop(33));
