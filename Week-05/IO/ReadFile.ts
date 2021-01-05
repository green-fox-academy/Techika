//import { readFileSync } from 'fs';
//import * as fs from 'fs';
export {};
declare function require(name: string);
const fs = require('fs');
//import { fs } from 'fs';

let fileContent = fs.readFileSync('fileDepo/readme.txt', 'utf-8');
console.log(fileContent);
