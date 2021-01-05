// Create a function that takes a number
// divides ten with it,
// and prints the result.
// It should print 'Cannot divide by zero!' if the parameter is 0

function divide10by (numToDivide:number):void{
  numToDivide===0 ? 
    console.log('Cannot divide by zero!') :
    console.log(10/numToDivide);
}

divide10by(0);
divide10by(111);
divide10by(1);

