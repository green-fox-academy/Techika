import { Pirate } from './Pirate';

export class Ship {
  crew: Pirate[] = [];
  captain: Pirate;
  shipName: string;

  constructor(shipName: string = `Ship-${Date.now()}`) {
    this.shipName = shipName;
  }

  fillShip() {
    //Filling the ship with a captain and random number of pirates.
    this.captain = new Pirate();
    for (let crewSize: number = Math.floor(Math.random() * 100); crewSize > 0; crewSize--) {
      this.crew.push(new Pirate());
    }
  }
  shipReport() {
    console.log(`Ship: ${this.shipName} reporting`);
    console.log(`Captain state: ${this.captain.statusCheck()}`);
    console.log(`Captain rum level: ${this.captain.rumConsumed}`);
    console.log(
      `Number of crew members:${this.crew.length} //`,
      `Alive:${this.crew.filter((member) => !member.statusCheck('dead')).length} --`,
      `Dead:${this.crew.filter((member) => member.statusCheck('dead')).length}`
    );
  }

  party(winner: Ship = this): void {
    //console.log('Christmas in the caribbean');
    for (
      let bottles: number = Math.floor(Math.random() * winner.crew.length * 4);
      bottles > 0;
      bottles--
    ) {
      let randomCrewMember: number = Math.floor(Math.random() * (winner.crew.length - 1));
      winner.crew[randomCrewMember].drinkSomeRum();
    }
    for (let bottles: number = Math.floor(Math.random() * 4); bottles > 0; bottles--) {
      winner.captain.drinkSomeRum();
    }
  }
  private losses(looser: Ship): void {
    for (
      let deaths: number = Math.floor(Math.random() * looser.crew.length);
      deaths > 0;
      deaths--
    ) {
      let randomCrewMember: number = Math.floor(Math.random() * (looser.crew.length - 1));
      looser.crew[randomCrewMember].die();
    }
  }

  battle(otherShip: Ship): boolean {
    let winner: Ship, looser: Ship;
    //calculate score: Number of Alive pirates in the crew - Number of consumed rum by the captain
    const output: boolean =
      this.crew.filter((member) => member.statusCheck('dead') === false).length -
        this.captain.rumConsumed >
      otherShip.crew.filter((member) => member.statusCheck('dead') === false).length -
        otherShip.captain.rumConsumed;
    output ? ((winner = this), (looser = otherShip)) : ((winner = otherShip), (looser = this));
    //The loser crew has a random number of losses (deaths).
    this.losses(looser);
    //The winner captain and crew has a party, including a random number of rum :)
    this.party(winner);
    return output;
  }
}

export class BattleApp {
  private battlePairs: Ship[] = [];
  constructor() {
    //Create 2 ships
    [1, 2].forEach((n) => this.battlePairs.push(new Ship()));
    // fill crew
    this.battlePairs.forEach((ship) => ship.fillShip);
    //battle ships
    //this.battleShips();
  }
  battleShips() {
    //console.log(this.battlePairs);
    this.battlePairs[0].battle(this.battlePairs[1]);
  }
}

export class Armada {
  // contains ships
  shipsStack: Ship[] = [];
  constructor() {
    new Array(Math.floor(Math.random() * 50)).fill(0).forEach(() => {
      this.shipsStack.push(new Ship());
    });
    this.shipsStack.forEach((ship) => ship.fillShip());
    //console.log('shipstack1', this.shipsStack[1]);
  }
  war(otherArmada: Armada): boolean {
    // war like merge sort
    // first ship from the first armada battles the first of the other
    // the loser gets deleted so the next ship comes in play from that armada
    // whichever armada gets to the end of its ships loses the war
    console.log('Armada sizes:', this.shipsStack.length, otherArmada.shipsStack.length);

    while (this.shipsStack.length !== 0 && otherArmada.shipsStack.length !== 0) {
      //console.log(this.shipsStack[0].crew);
      if (this.shipsStack[0].battle(otherArmada.shipsStack[0])) {
        // console.log(otherArmada.shipsStack.length);
        otherArmada.shipsStack = otherArmada.shipsStack.slice(1, otherArmada.shipsStack.length);
      } else {
        this.shipsStack = this.shipsStack.slice(1, this.shipsStack.length);
      }
    }
    // console.log('Armada sizes:', this.shipsStack.length, otherArmada.shipsStack.length);
    let weWon: boolean = this.shipsStack.length !== 0;
    console.log(
      'Battle report: ',
      weWon ? 'Hurray we won the battle' : 'Noboy lived to tell if we won...'
    );
    return weWon;
  }
}

export class WarApp {
  private battlePairs: Armada[] = [];
  constructor() {
    //Create 2 ships
    [1, 2].forEach((n) => this.battlePairs.push(new Armada()));
    // fill crew
    this.battlePairs.forEach((armada) => {
      armada.shipsStack.forEach((ship) => ship.fillShip());
    });
    //this.battleArmadas();
  }
  battleArmadas() {
    this.battlePairs[0].war(this.battlePairs[1]);
  }
}
