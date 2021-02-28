// define(['require', 'dependency'], function (require, factory) {
//   'use strict';

// });
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const pictureNames = fs.readdirSync('./gallery');
console.log(pictureNames);
