import { capitalize, downTo } from './helpers';

class Bottles {
  constructor(verseTemplate = BottleVerse) {
    this.verseTemplate = verseTemplate;
  } 

  song() {
    return this.verses(99, 0);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map(i => this.verse(i))
      .join('\n');
  }

  verse(number) {
    return this.verseTemplate.lyrics(number);
    // return new this.verseTemplate(number).lyrics();
  }
}

class BottleVerse {
  constructor(number) {
    this.number = number;
  }
  
  static lyrics(number) {
    return new BottleVerse(number).lyrics();
  }

  lyrics() {
    const bottleNumber = BottleNumber.for(this.number); 

    return (
      capitalize(`${bottleNumber} of milk on the wall, `) +
      `${bottleNumber} of milk.\n` +
      `${bottleNumber.action()}, ` +
      `${bottleNumber.successor()} of milk on the wall.\n`
    );
  }
}

class BottleNumber {
  constructor(number) {
    this.number = number;
  }

  static for(number) {
    let bottleNumberClass; switch (number) {
      case 0:
        bottleNumberClass = BottleNumber0; break;
      case 1:
        bottleNumberClass = BottleNumber1; break;
      case 6:
        bottleNumberClass = BottleNumber6; break;
      default:
        bottleNumberClass = BottleNumber; break;
    }
    return new bottleNumberClass(number);
  }

  // eslint-disable-next-line no-unused-vars
  static canHandle(number) {
    return true;
  }

  toString() {
    return `${this.quantity()} ${this.container()}`;
  }

  quantity() {
    return this.number.toString();
  }

  container() {
    return 'bottles';
  }

  action() {
    return `Take ${this.pronoun()} down and pass it around`;
  }

  pronoun() {
    return 'one';
  }

  successor() {
    return BottleNumber.for(this.number - 1);
  }
}

class BottleNumber0 extends BottleNumber {
  static canHandle(number) {
    return number === 0;
  }

  quantity() {
    return 'no more';
  }

  action() {
    return 'Go to the store and buy some more';
  }

  successor() {
    return BottleNumber.for(99); 
  }
}

class BottleNumber1 extends BottleNumber {
  static canHandle(number) {
    return number === 1;
  }

  container() {
    return 'bottle';
  }

  pronoun() {
    return 'it';
  }
}

class BottleNumber6 extends BottleNumber {
  static canHandle(number) {
    return number === 6;
  }

  container() {
    return 'six-pack';
  }

  quantity() {
    return '1';
  }
}

export { Bottles };