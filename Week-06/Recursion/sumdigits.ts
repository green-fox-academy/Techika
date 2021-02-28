//Given a non-negative integer n, return the sum of its digits recursively (without loops).
// There is no integer type in JavaScript. To remove the rightmost digit you must divide (/)
// the number by 10 and find a way to get the the whole number portion of that number.

function sumDigits(num: number): number {
  if (num % 10 === 0) return num / 10;
  else if (Math.floor(num / 10) === 0) return num % 10;
  return (num % 10) + (sumDigits(Math.floor(num / 10)) % 10);
}

console.log(sumDigits(15));
console.log(sumDigits(10));
console.log(sumDigits(5));
console.log(sumDigits(20));
console.log(sumDigits(3678));
