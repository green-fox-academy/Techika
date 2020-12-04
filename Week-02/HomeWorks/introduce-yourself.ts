'use strict';

// Write a program that prints a few details to the console about you
// It should print each detail to a new line:
//  - Your name
//  - Your age
//  - Your height in meters (as a decimal fraction)

const person = {
  firstName:"Adam",
  lastName:"Bukovinszki",
  born:1985,
  height:1.68,
};

console.log (`My name is: ${person.firstName + " " + person.lastName}`);
console.log (`My age is: ${new Date().getFullYear() - person.born}`);
console.log (`My height is: ${person.height}m`);