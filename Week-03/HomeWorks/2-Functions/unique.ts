//  Create a function that takes a list of numbers as a parameter
//  and returns a list of numbers where every number is unique (occurs only once)

 
// Classic solution
function findUniqueItems1(input):any {
  let output=[];
    input.forEach( a => {
      if (!output.some(b => a===b)){
        output.push(a);
      } 
    });
  return output;
}

//Compressed solution
function findUniqueItems2(input):any {
  let output=[];
  input.forEach(a => (!output.some(o => o===a) ? output.push(a):'whatever'));
  return output;
}

//Compressed and elegant solution
function findUniqueItems3(input){ 
  return input.filter((a,sorszam,input) => input.indexOf(a) === sorszam);
}
  

//  Test cases
console.log(findUniqueItems1([1, 11, 34, 11, 52, 61, 1, 34]));
console.log(findUniqueItems2([1, 11, 34, 11, 52, 61, 1, 34]));
console.log(findUniqueItems3([1, 11, 34, 11, 52, 61, 1, 34]));
//  should print: `[1, 11, 34, 52, 61]`