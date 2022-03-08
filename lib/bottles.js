import { capitalize, downTo } from './helpers';

class CountdownSong {
  constructor(verseTemplate, max = 999999, min = 0) {
    this.verseTemplate = verseTemplate;
    this.max = max;
    this.min = min;
  } 

  song() {
    return this.verses(this.max, this.min);
  }

  verses(upper, lower) {
    return downTo(upper, lower)
      .map(i => this.verse(i))
      .join('\n');
  }

  verse(number) {
    return this.verseTemplate.lyrics(number);
  }
}

class BottleVerse {
  constructor(number) {
    this.bottleNumber = number;
  }
  
  static lyrics(number) {
    return new BottleVerse(BottleNumber.for(number)).lyrics();
  }

  lyrics() {
    return (
      capitalize(`${this.bottleNumber} of milk on the wall, `) +
      `${this.bottleNumber} of milk.\n` +
      `${this.bottleNumber.action()}, ` +
      `${this.bottleNumber.successor()} of milk on the wall.\n`
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

export { CountdownSong, BottleVerse };