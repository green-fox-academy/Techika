/* eslint-disable linebreak-style */
/* eslint-disable no-console */
/* eslint-disable linebreak-style */

// An average Green Fox attendee codes 6 hours daily
// The semester is 17 weeks long
//
// Print how many hours is spent with coding in a semester by an attendee,
// if the attendee only codes on workdays.
//
// Print the percentage of the coding hours in the semester if the average
// work hours weekly is 52
const daily: number = 6;
const weekly = daily * 5;
const semesterWeek = 17;
const semesterDay = 5 * semesterWeek;
const semesterHour = semesterDay * daily;
const percentage = Math.round(weekly / (52 / 100));

console.log(`Hours coded in this semseter: ${semesterHour}`);

console.log(` % coded vs worked: ${percentage}`);
