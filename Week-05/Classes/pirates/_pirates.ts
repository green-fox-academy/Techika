import { Pirate } from './Pirate';
import { Ship } from './Ship';
import { BattleApp } from './Ship';
import { Armada } from './Ship';
import { WarApp } from './Ship';
//import * as sh from './Ship';

// const sparrow: Pirate = new Pirate();
// const fonda: Pirate = new Pirate();

// console.log(fonda.statusCheck());
// sparrow.passOut();
// fonda.brawl(sparrow);

// fonda.howsItGoingMate();
// sparrow.howsItGoingMate();

// const BigWar: WarApp = new WarApp();
// BigWar.battleArmadas();

const myShip: Ship = new Ship();
const hisShip: Ship = new Ship();
myShip.fillShip();
// myShip.party();
hisShip.fillShip();
// console.log(myShip);

// myShip.battle(hisShip);

// myShip.shipReport();
// hisShip.shipReport();

// const shipDuelDemo: BattleApp = new BattleApp();
// shipDuelDemo.battleShips();

//----- Armada ----
const myArmada: Armada = new Armada();
const yourArmada: Armada = new Armada();
//console.log(myArmada);
console.log(myArmada.war(yourArmada));

//----- WAR ----
const atWar: WarApp = new WarApp();
atWar.battleArmadas();
