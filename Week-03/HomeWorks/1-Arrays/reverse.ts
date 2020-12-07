// -  Create a variable named `numbers`
//    with the following content: `[3, 4, 5, 6, 7]`
// -  Reverse the order of the elements of `numbers`
// 	   -  do it with the built in method
//	   -  do it with creating a new temp array and a loop
// -  Print the elements of the reversed `numbers`

let numbers:number[]=[3,4,5,6,7];
//solution 1:
//numbers=numbers.reverse();

//solution 2: (without temp array needed)
for(let n=1;n<numbers.length/2;n++){
  [numbers[n-1],numbers[numbers.length-n]] = [numbers[numbers.length-n],numbers[n-1]];
}

console.log(numbers);
