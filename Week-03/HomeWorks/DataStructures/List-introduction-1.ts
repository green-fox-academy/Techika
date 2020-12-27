/*
Create an empty list which will contain names (strings)
Print out the number of elements in the list
Add William to the list
Print out whether the list is empty or not
Add John to the list
Add Amanda to the list
Print out the number of elements in the list
Print out the 3rd element
Iterate through the list and print out each name
William
John
Amanda
Iterate through the list and print
1. William
2. John
3. Amanda
Remove the 2nd element
Iterate through the list in a reversed order and print out each name
Amanda
William
Remove all elements */

let myList:string[]=[];
console.log(myList.length);
myList.push('William');
console.log((myList.length===0)?'Empty':'Not empty');
myList.push('John','Amanda');
console.log(myList.length);
console.log(myList[2]);
myList.forEach(name => console.log(name));
myList.forEach((name,i) => console.log(i+1+'.',name));
myList.splice(1,1);
myList.reverse().forEach(name => {console.log(name)});
myList = [];
console.log(myList);


