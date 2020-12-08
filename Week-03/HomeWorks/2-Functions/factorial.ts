// - Create a function called `calculateFactorial()`
//   that returns the factorial of its input


function calculateFactorial(toFactor:number):any{
  if(toFactor>1){
    return toFactor*calculateFactorial(toFactor-1);
  }else if (toFactor<=0){
    return ('Please provide a positive number');  
  } else {
    return 1;
  }
  
}


console.log(calculateFactorial(5));
