class Pirate {
  private status: 'ready' | 'passed out' | 'dead' = 'ready'; // dead/passed out/ready
  private toxicity: number = 0;

  constructor() {}
  // get status() {
  //   return this.status;
  // }
  statusCheck(specific?: 'ready' | 'passed out' | 'dead'): string | boolean {
    switch (this.status) {
      case 'dead':
        console.log('He is dead');
        if (specific !== undefined) {
          if (specific === 'dead') return true;
          else return false;
        }
        return this.status;
      case 'passed out':
        console.log('/Snoring/');
        if (specific !== undefined) {
          if (specific === 'passed out') return true;
          else return false;
        }
        return this.status;
      case 'ready':
        if (specific !== undefined) {
          if (specific === 'ready') return true;
          else return false;
        }
        return this.status;
      default:
        return false;
    }
  }

  drinkSomeRum(): void {
    //- intoxicates the Pirate some
    if (this.statusCheck()) this.toxicity += 1;
  }

  howsItGoingMate(): void {
    if (this.statusCheck('ready')) {
      if (this.toxicity <= 4) console.log('Pour me anudder!');
      // 0 to 4 times, "Pour me anudder!"
      else {
        console.log("Arghh, I'ma Pirate. How d'ya d'ink its goin?");
        this.status = 'passed out';
      }
    }
  }
  passOut(): void {
    if (this.statusCheck('ready')) this.status = 'passed out';
  }
  die(): void {
    //in which case, DrinkSomeRum, etc. just result in he's dead.
    if (!this.statusCheck('dead')) this.status = 'dead';
  }

  brawl(enemy: Pirate): void {
    //where pirate fights another pirate (if that other pirate is alive) and there's a 1/3 chance, 1 dies, the other dies or they both pass out.
    if (this.statusCheck('dead')) return;
    if (enemy.statusCheck('passed out')) enemy.die();
    else if (enemy.statusCheck('ready')) {
      switch (Math.floor(Math.random() * Math.floor(3))) {
        case 0:
          this.die();
          break;
        case 1:
          enemy.die();
          break;
        case 2:
          this.passOut();
          enemy.passOut();
          break;
        default:
          break;
      }
    }
  }
}

const sparrow: Pirate = new Pirate();
const fonda: Pirate = new Pirate();

console.log(fonda.statusCheck());
//sparrow.passOut();
fonda.brawl(sparrow);

fonda.howsItGoingMate();
sparrow.howsItGoingMate();
