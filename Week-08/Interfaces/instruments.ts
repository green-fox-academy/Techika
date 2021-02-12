//  JUST INITIATED, NOT COMPLETED

import { inherits } from 'util';

abstract class Instrument {
  private _name: string;
  play(): void {
    //console.log(`${this._name}, an instrument that goes Twang`);
  }
}

abstract class StringedInstrument extends Instrument {
  numberOfStrings: number;
  constructor(numberOfStrings: number) {
    super();
    super.play();
    this.numberOfStrings = numberOfStrings;
  }
  sound(): void {}
}

class ElectricGuitar extends StringedInstrument {}

class BassGuitar extends StringedInstrument {}

class Violin extends StringedInstrument {}

console.log('Test 1, create Electric Guitar, Bass Guitar and Violin with default strings.');

let guitar = new ElectricGuitar();
let bassGuitar = new BassGuitar();
let violin = new Violin();

console.log('Test 1 Play');
guitar.play();
bassGuitar.play();
violin.play();

console.log('Test 2, create Electric Guitar, Bass Guitar with 7 and 5 strings.');
let guitar2 = new ElectricGuitar(7);
let bassGuitar2 = new BassGuitar(5);

console.log('Test 2 Play');
guitar2.play();
bassGuitar2.play();
