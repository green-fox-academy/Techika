const canvas = document.querySelector('.myCanvas');
const ctx = canvas.getContext('2d');
// ctx.fillRect(20, 20, 150, 100);
// alert( 'Hello, world!' );
clockify();
function clockify() {
  (function () {
    for (
      let i = 1, rotator_1 = 0, count10_1 = 0, count1000_1 = 0, cloner_1 = 0;
      i <= 600;
      i++
    ) {
      drawLinedRects({
        startPosition: [canvas.width / 2 - 4.5, canvas.height / 2 - 4.5],
        cloneCount: 2 - cloner_1,
        sideSize: 9,
        cloneDegree: 270 + count1000_1,
        rotationDegree: 45 + rotator_1,
        fillColor: 'rgb(173, 152, 32)',
        growthFactor: 1.4,
      });
      rotator_1 += 36;
      if (rotator_1 === 361) rotator_1 = 1;
      count10_1 += 1;
      switch (count10_1) {
        case 1:
          cloner_1 = 1;
          break;
        case 10:
          cloner_1 = 0;
          count10_1 = 0;
          break;
        default:
          // not needed
      }
      count1000_1 += 0.6;
      if (count1000_1 === 1001) count1000_1 = 1;
    }
  }());
  let rotator = 0;
  let count10 = 0;
  let count1000 = 0;
  let cloner = 0;
  setInterval(() => {
    drawLinedRects({
      startPosition: [canvas.width / 2 - 4.5, canvas.height / 2 - 4.5],
      cloneCount: 2 - cloner,
      sideSize: 9,
      cloneDegree: 270 + count1000,
      rotationDegree: 45 + rotator,
      fillColor: 'rgb(173, 152, 32)',
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
          // not needed
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
 * If 'vertex' (best for 45°) or 'side' (best for 90°) distance should be the basis of cloning distance.
 * @param cloneDistancePadding : If extra padding is required between instances.
 * @param growthFactor :
 * The factor by which consecutive instanes should be bigger or smaller. (eg. 1.2)
 */
function drawLinedRects(_a) {
  const _b = _a === void 0 ? {} : _a;
  const _c = _b.startPosition;
  const startPosition = _c === void 0 ? [0, 0] : _c;
  const _d = _b.sideSize;
  const sideSize = _d === void 0 ? 10 : _d;
  const _e = _b.rotationDegree;
  const rotationDegree = _e === void 0 ? 0 : _e;
  const _f = _b.cloneDegree;
  const cloneDegree = _f === void 0 ? 45 : _f;
  const _g = _b.cloneCount;
  const cloneCount = _g === void 0 ? 5 : _g;
  const _h = _b.cloneDistanceMode;
  const cloneDistanceMode = _h === void 0 ? 'vertex' : _h;
  const _j = _b.cloneDistancePadding;
  const cloneDistancePadding = _j === void 0 ? 0 : _j;
  const _k = _b.growthFactor;
  const growthFactor = _k === void 0 ? 1 : _k;
  const _l = _b.lineColor;
  const lineColor = _l === void 0 ? 'black' : _l;
  const _m = _b.fillColor;
  const fillColor = _m === void 0 ? 'purple' : _m;
  const _o = _b.lineWidth;
  const lineWidth = _o === void 0 ? 1 : _o;
  // Declarations
  const midpoint = [
    startPosition[0] + sideSize / 2,
    startPosition[1] + sideSize / 2,
  ];
  const radius = Math.sqrt(2 * Math.pow(sideSize / 2, 2));
  const rotationRadian = (rotationDegree * Math.PI) / 180;
  const cloneRadian = (cloneDegree * Math.PI) / 180;
  const startAngle = (2 * Math.PI) / 8;
  let cloneDistance = 0;
  let prevCloneDistance = cloneDistanceMode === 'vertex'
    ? radius + cloneDistancePadding
    : /* side */ sideSize / 2 + cloneDistancePadding;
  const cloneMid = [midpoint[0], midpoint[1]];
  let cloneRadius = 0;
  let prevCloneRadius = radius;
  // CORE
  for (let clones = 0; clones < cloneCount; clones++) {
    cloneRadius = radius * Math.pow(growthFactor, clones);
    ctx.beginPath();
    ctx.moveTo(
      cloneMid[0] + cloneRadius * Math.cos(rotationRadian + startAngle),
      cloneMid[1] + cloneRadius * Math.sin(rotationRadian + startAngle),
    );
    for (let side = 1; side <= 4; side++) {
      ctx.lineTo(
        cloneMid[0]
          + cloneRadius
            * Math.cos(startAngle + rotationRadian + (side * 2 * Math.PI) / 4),
        cloneMid[1]
          + cloneRadius
            * Math.sin(startAngle + rotationRadian + (side * 2 * Math.PI) / 4),
      );
    }
    ctx.lineWidth = lineWidth;
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = lineColor;
    ctx.fill();
    ctx.stroke();
    cloneRadius = radius * Math.pow(growthFactor, clones + 1);
    switch (cloneDistanceMode) {
      case 'vertex':
        cloneDistance = cloneRadius + ctx.lineWidth / 2 + cloneDistancePadding;
        break;
      case 'side':
        cloneDistance = Math.sqrt(Math.pow(cloneRadius, 2) / 2)
          + ctx.lineWidth / 2
          + cloneDistancePadding;
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
