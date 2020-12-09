//  Create a function that takes a list of numbers as parameter
//  and returns a list where the elements are sorted in ascending numerical order
//  When you are done, add a second boolean parameter to the function
//  If it is `true` sort the list descending, otherwise ascending


function advancedBubble(input:number[],reverse:boolean=false){
  for (let a=0; a<input.length-1; a++){
    let done=true;
    for (let b=0; b<input.length-a;b++){
      if (!reverse && input[b]>input[b+1]){
        input.splice(b,2,input[b+1],input[b]);
        done=false;
      }
      if (reverse && input[b]<input[b+1]){
        input.splice(b,2,input[b+1],input[b]);
        done=false;
      }
      console.log(input);
    } 
    if (done) break;
  } 
  return input;
}

// function quickSort(input:number[],reverse:boolean=false){
//   // *Maybe later if needed...
// }

//  Example:
//console.log(bubble([34, 12, 24, 9, 5]));
//  should print [5, 9, 12, 24, 34]
console.log(advancedBubble([34, 12, 24, 9, 5,1],true));
//  should print [34, 24, 12, 9, 5]