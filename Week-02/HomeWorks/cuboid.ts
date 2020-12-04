/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// Write a program that stores 3 sides of a cuboid as variables (floats)
// The program should write the surface area and volume of the cuboid like:
//
// Surface Area: 600
// Volume: 1000

const cuboid = {
  sideA: 12,
  sideB: 24,
  sideC: 25,
};
console.log(
  `Surface Area: ${
    2 *
    (cuboid.sideA * cuboid.sideB +
      cuboid.sideB * cuboid.sideC +
      cuboid.sideC * cuboid.sideA)
  }cm2`
);

console.log(`Volume: ${cuboid.sideA * cuboid.sideB * cuboid.sideC}cm3`);
