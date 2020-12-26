'use strict';
exports.__esModule = true;
var canvas = document.querySelector('.main-canvas');
var ctx = canvas.getContext('2d');
// DO NOT TOUCH THE CODE ABOVE THIS LINE
canvas.width = 400;
canvas.height = 400;
// --- solution for excercise 1 (19 purple squares in 45°) : ---
// [https://github.com/green-fox-academy/teaching-materials/blob/master/workshop/drawing/assets/r3.png]
//drawLinedRects({startPosition: [10, 10], cloneCount:19, sideSize:15, cloneDegree:45,fillColor:'purple'});
// --- solution for excercise 2 (6 growing purple squares in 45°) : ---
//drawLinedRects({startPosition: [10, 10], cloneCount:6, sideSize:15, cloneDegree:45,fillColor:'purple',growthFactor:1.5});
// --- Showcase of all extra things this can do: (Animated Buk-O-clocK v1.0) : ---
clockify();
function clockify() {
    (function () {
        for (var i = 1, rotator_1 = 0, count10_1 = 0, count1000_1 = 0, cloner_1 = 0; i <= 600; i++) {
            drawLinedRects({ startPosition: [canvas.width / 2, canvas.height / 2], cloneCount: 2 - cloner_1, sideSize: 15,
                cloneDegree: 270 + count1000_1, rotationDegree: 45 + rotator_1, fillColor: 'violet', growthFactor: 1.4 });
            rotator_1 += 36;
            if (rotator_1 === 361)
                rotator_1 = 1;
            count10_1 += 1;
            switch (count10_1) {
                case 1:
                    cloner_1 = 1;
                    break;
                case 10:
                    cloner_1 = 0;
                    count10_1 = 0;
                    break;
            }
            count1000_1 += 0.6;
            if (count1000_1 === 1001)
                count1000_1 = 1;
        }
    }());
    var rotator = 0;
    var count10 = 0;
    var count1000 = 0;
    var cloner = 0;
    setInterval(function () {
        drawLinedRects({ startPosition: [canvas.width / 2, canvas.height / 2], cloneCount: 2 - cloner, sideSize: 15,
            cloneDegree: 270 + count1000, rotationDegree: 45 + rotator, fillColor: 'violet', growthFactor: 1.4 });
        rotator += 72;
        if (rotator === 361)
            rotator = 1;
        count10 += 1;
        switch (count10) {
            case 1:
                cloner = 1;
                break;
            case 10:
                cloner = 0;
                count10 = 0;
                break;
        }
        count1000 += 0.6;
        if (count1000 === 1001)
            count1000 = 1;
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
    var _b = _a === void 0 ? {} : _a, _c = _b.startPosition, startPosition = _c === void 0 ? [0, 0] : _c, _d = _b.sideSize, sideSize = _d === void 0 ? 10 : _d, _e = _b.rotationDegree, rotationDegree = _e === void 0 ? 0 : _e, _f = _b.cloneDegree, cloneDegree = _f === void 0 ? 45 : _f, _g = _b.cloneCount, cloneCount = _g === void 0 ? 5 : _g, _h = _b.cloneDistanceMode, cloneDistanceMode = _h === void 0 ? 'vertex' : _h, _j = _b.cloneDistancePadding, cloneDistancePadding = _j === void 0 ? 0 : _j, _k = _b.growthFactor, growthFactor = _k === void 0 ? 1 : _k, _l = _b.lineColor, lineColor = _l === void 0 ? 'black' : _l, _m = _b.fillColor, fillColor = _m === void 0 ? 'purple' : _m, _o = _b.lineWidth, lineWidth = _o === void 0 ? 1 : _o;
    // Declarations
    var midpoint = [
        startPosition[0] + sideSize / 2,
        startPosition[1] + sideSize / 2
    ];
    var radius = Math.sqrt(2 * (Math.pow((sideSize / 2), 2)));
    var rotationRadian = rotationDegree * Math.PI / 180;
    var cloneRadian = cloneDegree * Math.PI / 180;
    var startAngle = 2 * Math.PI / 8;
    var cloneDistance = 0;
    var prevCloneDistance = (cloneDistanceMode === 'vertex') ? radius + cloneDistancePadding : /*side*/ sideSize / 2 + cloneDistancePadding;
    var cloneMid = [midpoint[0], midpoint[1]];
    var cloneRadius = 0;
    var prevCloneRadius = radius;
    // CORE
    for (var clones = 0; clones < cloneCount; clones++) {
        cloneRadius = radius * Math.pow(growthFactor, clones);
        ctx.beginPath();
        ctx.moveTo(cloneMid[0] + cloneRadius * Math.cos(rotationRadian + startAngle), cloneMid[1] + cloneRadius * Math.sin(rotationRadian + startAngle));
        for (var side = 1; side <= 4; side++) {
            ctx.lineTo(cloneMid[0] + cloneRadius * Math.cos(startAngle + rotationRadian + side * 2 * Math.PI / 4), cloneMid[1] + cloneRadius * Math.sin(startAngle + rotationRadian + side * 2 * Math.PI / 4));
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
                cloneDistance = Math.sqrt(Math.pow(cloneRadius, 2) / 2) + ctx.lineWidth / 2 + cloneDistancePadding;
                break;
        }
        cloneMid[0] += (prevCloneDistance + cloneDistance) * Math.cos(cloneRadian);
        cloneMid[1] += (prevCloneDistance + cloneDistance) * Math.sin(cloneRadian);
        prevCloneRadius = cloneRadius;
        prevCloneDistance = cloneDistance;
    }
}
