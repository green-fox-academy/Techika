abstract class Animals {
  name: string;
  age: number;
  abstract color: string;
  abstract size: number;
  getName(): string {
    return this.name;
  }
  abstract breed(): void;
  abstract feed(): void;
  constructor(name: string) {
    this.name = name;
    this.age = 0;
  }
}

class Reptile extends Animals {
  hasScales = true;
  breed() {
    return 'laying eggs';
  }
}

class Bird extends Animals {
  eggsLaid: number = 0;
  layEggs() {
    this.eggsLaid += 1;
  }
}

class Mammal extends Animals {
  hasTits: boolean = true;
  giveBirth() {}
}

const reptile = new Reptile('Crocodile');
const mammal = new Mammal('Koala');
const bird = new Bird('Parrot');

console.log('How do you breed?');
console.log(`A ${reptile.getName()} is breeding by ${reptile.breed()}`);
console.log(`A ${mammal.getName()} is breeding by ${mammal.breed()}`);
console.log(`A ${bird.getName()} is breeding by ${bird.breed()}`);

// How do you breed?
// A Crocodile is breeding by laying eggs.
// A Koala is breeding by pushing miniature versions out.
// A Parrot is breeding by laying eggs.
