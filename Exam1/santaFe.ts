enum colors {
  white,
  brown,
  black,
  blue,
  pink,
  red,
  purple,
  orange,
  green,
  yellow,
}
enum sizes {
  small,
  normal,
  large,
  XXL,
}

enum toyTypes {
  Doll,
  DottedBall,
  JumpingRope,
}
enum toysWithSize {
  DottedBall,
  JumpingRope,
}

interface customSize {
  size: sizes;
}

abstract class Toy {
  cost: number;
  color: colors;
  owner: string;
  constructor(color: colors) {
    this.owner = null;
    this.color = color;
  }
}

abstract class SizedToy extends Toy implements customSize {
  size: sizes;
  constructor(color: colors, size: sizes) {
    super(color);
    this.size = size;
  }
}

class Doll extends Toy {
  constructor(color: colors) {
    super(color);
    this.cost = 25;
  }
}

class DottedBall extends SizedToy {
  size: sizes;
  constructor(color: colors, size: sizes) {
    super(color, size);
    this.cost = 10;
  }
}

class JumpingRope extends SizedToy {
  constructor(color: colors, size: sizes) {
    super(color, size);
    this.cost = 15;
  }
}

function randomEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][];
  const randomIndex = Math.floor(Math.random() * enumValues.length);
  const randomEnumValue = enumValues[randomIndex];
  return randomEnumValue;
}
class ToyFactory {
  private balance: number = 200;

  //produce(color: colors): Doll | null;
  get currentBalance(): number {
    return this.balance;
  }
  produce(color: colors, size?: sizes): Doll | Toy | null {
    if (size) {
      const randomToyClass: string = toysWithSize[randomEnum(toysWithSize)];
      const objTemp: Toy = eval(`new ${randomToyClass}(${color},${size})`);
      const randomToyCost: number = objTemp.cost;
      if (randomToyCost <= this.balance) {
        this.balance -= randomToyCost;
        return objTemp; //new Object[randomToyClass]();
      } else {
        return null;
      }
    } else {
      const objTemp: Doll = new Doll(color);
      if (objTemp.cost <= this.balance) {
        this.balance -= objTemp.cost;
        return objTemp;
      } else {
        return null;
      }
    }
  }
}

class Santa {
  santaFactory: ToyFactory = new ToyFactory();
  bag: Toy[] = [];
  children: string[] = ['Marci', 'Berci', 'Karcsi', 'Tercsi', 'Ancsa', 'Jancsi', 'Bence', 'Jenci'];

  randomColor(): colors {
    return randomEnum(colors);
  }
  randomSize() {
    return randomEnum(sizes);
  }

  addToyToBag(color: colors = this.randomColor(), size: sizes = this.randomSize()) {
    const selectedType = randomEnum(toyTypes);
    if (selectedType === toyTypes.Doll) {
      this.bag.push(this.santaFactory.produce(color));
    } else {
      this.bag.push(this.santaFactory.produce(color, size));
    }
  }
  bringToChildren() {
    this.children.forEach((element, index) => {});
    for (let child of this.children) {
      if (this.bag.length !== 0) {
        const randomKidIndex = Math.floor(Math.random() * (this.children.length - 1 - 0 + 1) + 0);
        this.bag[0].owner = this.children[randomKidIndex];
        this.children.splice(randomKidIndex, 1);
        this.bag.splice(0, 1);
      } else {
        break;
      }
    }
  }
}

const santa: Santa = new Santa();

santa.addToyToBag();
santa.addToyToBag();
santa.addToyToBag();
console.log(santa);
santa.bringToChildren();
console.log(santa);
