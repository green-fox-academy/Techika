// Write a program that prints the numbers from 1 to 100
// but for multiples of three print “Fizz” instead of the number
// and for the multiples of five print “Buzz”
// For numbers which are multiples of both three and five print “FizzBuzz”

for (let i: number = 1; i <= 100; i = i + 1) {
  let printer: string = "";
  if (i % 3 === 0) {
    printer += "Fizz";
  }
  if (i % 5 === 0) {
    printer += "Buzz";
  }
  if (printer === "") {
    printer += i;
  }
  console.log(printer);
}
