/* eslint-disable no-use-before-define */
const canvas = document.querySelector('.myCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');
export {};

// DO NOT TOUCH THE CODE ABOVE THIS LINE

// canvas.width=400;
// canvas.height=400;

// --- solution for excercise 1 (19 purple squares in 45°) : ---
// [https://github.com/green-fox-academy/teaching-materials/blob/master/workshop/drawing/assets/r3.png]
// drawLinedRects({startPosition: [10, 10], cloneCount:19, sideSize:15,
// cloneDegree:45,fillColor:'purple'});

// --- solution for excercise 2 (6 growing purple squares in 45°) : ---
// drawLinedRects({startPosition: [10, 10], cloneCount:6, sideSize:15,
// cloneDegree:45,fillColor:'purple',growthFactor:1.5});

// --- Showcase of all extra things this can do: (Animated Buk-O-clocK v1.0) : ---
clockify();
function clockify() {
  (function clockFace() {
    // Drawing ClockFace
    for (let i = 1, rotator = 0, count10 = 0, count1000 = 0, cloner = 0; i <= 600; i++) {
      drawLinedRects({
        startPosition: [canvas.width / 2, canvas.height / 2],
        cloneCount: 2 - cloner,
        sideSize: 15,
        cloneDegree: 270 + count1000,
        rotationDegree: 45 + rotator,
        fillColor: 'rgb(173, 152, 32)', // "violet",
        growthFactor: 1.4,
      });
      rotator += 36;
      if (rotator === 361) rotator = 1;
      count10 += 1;
      switch (count10) {
        case 1:
          cloner = 1;
          break;
        case 10:
          cloner = 0;
          count10 = 0;
          break;
        default:
          break;
      }
      count1000 += 0.6;
      if (count1000 === 1001) count1000 = 1;
    }
  }());
  let rotator = 0;
  let count10 = 0;
  let count1000 = 0;
  let cloner = 0;
  setInterval(() => {
    // Animating ClockParts
    drawLinedRects({
      startPosition: [canvas.width / 2, canvas.height / 2],
      cloneCount: 2 - cloner,
      sideSize: 15,
      cloneDegree: 270 + count1000,
      rotationDegree: 45 + rotator,
      fillColor: 'rgb(173, 152, 32)', // "violet",
      growthFactor: 1.4,
    });
    rotator += 72;
    if (rotator === 361) rotator = 1;
    count10 += 1;
    switch (count10) {
      case 1:
        cloner = 1;
        break;
      case 10:
        cloner = 0;
        count10 = 0;
        break;
      default:
        break;
    }
    count1000 += 0.6;
    if (count1000 === 1001) count1000 = 1;
  }, 100);
}

// --- Main Function Below ---
/**
 *
 * @param startPosition : Upper left corner of first instance.
 * @param sideSize : Pixel length of one side.
 * @param rotationDegree :
 * Degree of square object rotation around its center.
 * @param cloneDegree :
 * Degree of object cloning direction. (0=right, 90= down, etc.)
 * @param cloneCount : Number of required object instances.
 * @param cloneDistanceMode :
 * If 'vertex' (best for 45°) or 'side' (best for 90°) distance should be the basis of cloning.
 * @param cloneDistancePadding : If extra padding is required between instances.
 * @param growthFactor :
 * The factor by which consecutive instanes should be bigger or smaller. (eg. 1.2)
 */
function drawLinedRects({
  startPosition = [0, 0],
  sideSize = 10,
  rotationDegree = 0,
  cloneDegree = 45,
  cloneCount = 5,
  cloneDistanceMode = 'vertex',
  cloneDistancePadding = 0,
  growthFactor = 1,
  lineColor = 'black',
  fillColor = 'purple',
  lineWidth = 1,
}: {
  startPosition?: [number, number];
  sideSize?: number;
  rotationDegree?: number;
  cloneDegree?: number;
  cloneCount?: number;
  cloneDistanceMode?: 'vertex' | 'side';
  cloneDistancePadding?: number;
  growthFactor?: number;
  lineColor?: string;
  fillColor?: string;
  lineWidth?: number;
} = {}): void {
  // Declarations
  const midpoint = [startPosition[0] + sideSize / 2, startPosition[1] + sideSize / 2];
  const radius = Math.sqrt(2 * (sideSize / 2) ** 2);
  const rotationRadian = (rotationDegree * Math.PI) / 180;
  const cloneRadian = (cloneDegree * Math.PI) / 180;
  const startAngle = (2 * Math.PI) / 8;
  let cloneDistance = 0;
  let prevCloneDistance: number = cloneDistanceMode === 'vertex'
    ? radius + cloneDistancePadding
    : /* side */ sideSize / 2 + cloneDistancePadding;
  const cloneMid = [midpoint[0], midpoint[1]];
  let cloneRadius = 0;
  let prevCloneRadius: number = radius;
  // CORE
  for (let clones = 0; clones < cloneCount; clones++) {
    cloneRadius = radius * (growthFactor ** clones);
    ctx.beginPath();
    ctx.moveTo(
      cloneMid[0] + cloneRadius * Math.cos(rotationRadian + startAngle),
      cloneMid[1] + cloneRadius * Math.sin(rotationRadian + startAngle),
    );
    for (let side = 1; side <= 4; side++) {
      ctx.lineTo(
        cloneMid[0]
          + cloneRadius * Math.cos(startAngle + rotationRadian + (side * 2 * Math.PI) / 4),
        cloneMid[1]
          + cloneRadius * Math.sin(startAngle + rotationRadian + (side * 2 * Math.PI) / 4),
      );
    }
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.fill();
    ctx.stroke();
    cloneRadius = radius * (growthFactor ** (clones + 1));
    switch (cloneDistanceMode) {
      case 'vertex':
        cloneDistance = cloneRadius + ctx.lineWidth / 2 + cloneDistancePadding;
        break;
      case 'side':
        // eslint-disable-next-line max-len
        cloneDistance = Math.sqrt((cloneRadius ** 2) / 2) + ctx.lineWidth / 2 + cloneDistancePadding;
        break;
      default:
        // not needed
    }
    cloneMid[0] += (prevCloneDistance + cloneDistance) * Math.cos(cloneRadian);
    cloneMid[1] += (prevCloneDistance + cloneDistance) * Math.sin(cloneRadian);
    prevCloneRadius = cloneRadius;
    prevCloneDistance = cloneDistance;
  }
}
