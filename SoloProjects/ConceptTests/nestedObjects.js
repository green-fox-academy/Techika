var Fia = /** @class */ (function () {
    function Fia() {
        this.neme = 'fiu';
    }
    return Fia;
}());
var Apa = /** @class */ (function () {
    function Apa() {
        this.kora = 30;
        this.fia = new Fia();
        this.lanya = new (/** @class */ (function () {
            function class_1() {
                this.neme = 'lany';
            }
            return class_1;
        }()))();
    }
    return Apa;
}());
var apa = new Apa();
console.log(apa.fia);
console.log(apa.lanya);
