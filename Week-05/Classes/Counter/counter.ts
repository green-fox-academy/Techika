class Counter {
  integer: number;
  initial: number;
  constructor(integer: number = 0) {
    this.integer = integer;
    this.initial = integer;
  }
  add(number: number = 1) {
    this.integer += number;
  }
  get() {
    return this.integer;
  }
  reset() {
    this.integer = this.initial;
  }
}

export { Counter };
