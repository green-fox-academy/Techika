 // - Create a two dimensional list dynamically with the following content.
 //   Note that a two dimensional list is often called matrix if every
 //   internal list has the same length.
 //   Use a loop!
 //
 //   1 0 0 0
 //   0 1 0 0
 //   0 0 1 0
 //   0 0 0 1
 //
 //   Its length should depend on a variable
 //  
 // - Print this two dimensional list to the output

let mLen:number=4;
let matrix:number[][]=[];

for (let x=1;x<=mLen ;x++){
  matrix.push([]);
  for (let y=1;y<=mLen ;y++){
    if (x===y) {
      matrix[x-1].push(1);
    } else {
      matrix[x-1].push(0);
    }
  }
}

console.log(matrix);

