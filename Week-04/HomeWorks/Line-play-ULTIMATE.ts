'use strict';

import { createTypeAliasDeclaration } from "typescript";

const canvas = document.querySelector('.main-canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// Test area definition:
ctx.canvas.height=700;
ctx.canvas.width=700;

/* Excercise: Divide the canvas into 4/16/64 equal parts and repeat the line play pattern in each quarter.
I have reated a generalised solution for either 1 or any number of line-play splits.
I have reduced the flexibility dimensions of the function (you cannot send the corner point definitions any more).
You can stil define: Target canvas, Canvas engine, Side Padding, Corner Padding, Divisions, Resolution in steps, debugMode
*/

drawLinePlay({canvasXdivisions:2,steps:50});

/**
 * 
 * @param SidePadding : 
 * Number of pixels should be left blank on the sides of the canvas blocks.
 * @param upperLeftCornerPaddingRatio :
 *  Defining a % of where the drawing should start from in the upper left corner.
 * @param lowerRightCornerPaddingRatio : 
 * Defining a % of where the drawing should end in the lower right corner.
 * @param canvasXdivisions : 
 * How many sudivisions should the Canves have on the X axis (and the Y axis, if only X provided).
 * @param canvasYdivisions : 
 * How many sudivisions should the Canves have on the Y axis
 * @param steps : 
 * How many lines should compose one instance of the drawing.
 * @param debugMode : 
 * Turning console logs on or off. (default off).
 */
function drawLinePlay 
({ // Default parameter settings
  canvas = document.querySelector('.main-canvas') as HTMLCanvasElement,
  ctx = canvas.getContext('2d'),
  SidePadding = 5,
  upperLeftCornerPaddingRatio = 15,
  lowerRightCornerPaddingRatio = 5,
  canvasXdivisions = 1,
  canvasYdivisions,
  steps = 20,
  debugMode = true,
}:{ // Parameters and types
    canvas?: HTMLCanvasElement;
    ctx?: CanvasRenderingContext2D;
    SidePadding?: number;
    upperLeftCornerPaddingRatio?: number;
    lowerRightCornerPaddingRatio?: number;
    canvasXdivisions?:number;
    canvasYdivisions?:number;
    steps?: number;
    debugMode?: boolean;
  } = {},
):void{ // No Function return!
  if (canvasYdivisions === undefined){
    //canvasYdivisions = Math.sqrt(canvasDivisions); This would only work well if proper square number is provided !
    canvasYdivisions = canvasXdivisions;   // In current implementation you always need to define width divisions
  }
  let subCanvasMetrics:[number,number] = [ // It stores the x and y size of one sub-canvas block.
    canvas.width/canvasXdivisions,
    canvas.height/canvasYdivisions
  ];
  for (let partX=1; partX <=canvasXdivisions; partX++){ // looping through X axis sub-canvas blocks
    for (let partY=1; partY <=canvasYdivisions; partY++){ // looping through Y axis sub-canvas blocks
      let drawScope: [number, number, number, number] = [ // Defining the X and Y start and end positions of the current canvas block.
        subCanvasMetrics[0]*(partX-1),
        subCanvasMetrics[1]*(partY-1),
        subCanvasMetrics[0]*(partX),
        subCanvasMetrics[1]*(partY)
      ];
      let // --lets: -----------------------------------------
        cUo: [number, number] = [ // Upper corner Coordinates
          drawScope[2] - SidePadding, 
          drawScope[1] + SidePadding
        ],  
        cUx: [number, number] = [ // Upper X axis scope point Coordinates
          drawScope[0] + (drawScope[2]-drawScope[0]) * (upperLeftCornerPaddingRatio/100),
          drawScope[1] + SidePadding
        ], 
        cUy: [number, number] = [ // Upper Y axis scope point Coordinates
          drawScope[2] - SidePadding, 
          drawScope[1] + (drawScope[3] - drawScope[1]) * ((100-lowerRightCornerPaddingRatio)/100),
        ],
        cLo: [number, number] = [ // Lower corner Coordinates
          drawScope[0] + SidePadding, 
          drawScope[3] - SidePadding
        ], 
        cLx: [number, number] = [ // Lower X axis scope point Coordinates
          drawScope[0] + (drawScope[2]-drawScope[0]) * ((100-lowerRightCornerPaddingRatio)/100), 
          drawScope[3] - SidePadding
        ],
        cLy: [number, number] = [ // Lower Y axis scope point Coordinates
          drawScope[0] + SidePadding,
          drawScope[1] + (drawScope[3] - drawScope[1]) * (upperLeftCornerPaddingRatio/100),
        ],
        // Translating relative ("steps") resolution into actual resolution on the particular canvas. ::
        rUh = (cUo[0] - cUx[0]) / steps, // Length of 1 upper horizontal step
        rUv = (cUy[1] - cUo[1]) / steps, // Length of 1 upper vertical step
        rLh = (cLx[0] - cLo[0]) / steps, // Length of 1 Lower horizontal step
        rLv = (cLo[1] - cLy[1]) / steps  // Length of 1 Lower vertical step
      ;// --\lets ------------------------------------------------
      // draw upper right corner
      if (debugMode) console.log('drawScope:',drawScope);
      for (let i:number=1; i< steps; i++){
        ctx.beginPath();
        ctx.moveTo(cUo[0]-i*rUh,cUo[1]); // From: Corner -> i*horizontastepLength
        ctx.lineTo(cUy[0],cUy[1]-i*rUv); // To: Corner -> i*verticallStepLength
        ctx.strokeStyle='purple';
        ctx.stroke();
      }
      if (debugMode) console.log('cUo',cUo,'cUy:',cUy);

      //draw lower left corner
      for (let i:number=1; i< steps; i++){
        ctx.beginPath();
        ctx.moveTo(cLo[0]+i*rLh,cLo[1]);
        ctx.lineTo(cLy[0],cLy[1]+i*rLv);
        ctx.strokeStyle='green';
        ctx.stroke();
      }
      if (debugMode) console.log('cLy:', cLy);
    }
  }
}