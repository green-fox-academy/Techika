class Animal {
  private hunger: number = 50;
  protected thirst: number = 50;
  eat(): void {
    this.hunger -= 1;
  }
  drink(): void {
    this.thirst -= 1;
  }
  play(): void {
    this.hunger += 1;
    this.thirst += 1;
  }
}

const zebra: Animal = new Animal();

zebra.play();
console.log(zebra);
