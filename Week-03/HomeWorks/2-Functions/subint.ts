'use strict';
//  Create a function that takes a number and an array of numbers as a parameter
//  and returns the indices of the numbers of the array which contain the given number
//  or returns an empty list (if the number is not part of any of the numbers in the array)
// Example
console.log(findMatchingIndexes(1, [1, 11, 34, 52, 61]));
// should print: `[0, 1, 4]`
console.log(findMatchingIndexes(9, [1, 11, 34, 52, 61]));
// should print: '[]'


function findMatchingIndexes(test:number,pool: number[]):number[]{
  // return pool.filter((a,id,arr)=> {
  //   let b = a.toString(), tstring = test.toString();
  //   if (b.includes(tstring)) return true;
  // });
  /*loop through the array items, compare the chunks and of it matches copy over...  */
  let output:number[]=[]; 
  for (let i in pool){
    if (pool[i].toString().includes(test.toString())) output.push(parseInt(i));
  }
  return output
}


