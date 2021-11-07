import { downTo } from './helpers';

class Bottles {

  firstLine(number) {
    switch (number) {
      case 0:
        return 'No more bottles of milk on the wall, ';
      case 1:
        return '1 bottle of milk on the wall, ';
      default:
        return `${number} bottles of milk on the wall, `;
    }
  }
  
  secondLine(number) {
    switch (number) {
      case 0:
        return 'no more bottles of milk.\n';
      case 1:
        return `${number} bottle of milk.\n`;
      default:
        return `${number} bottles of milk.\n`;
    }
  }

  thirdLine(number) {
    switch (number) {
      case 0:
        return 'Go to the store and buy some more, ';
      case 1:
        return 'Take it down and pass it around, ';
      default:
        return 'Take one down and pass it around, ';
    }
  }

  lastLine(number) {
    switch (number) {
      case 0:
        return 'no more bottles of milk on the wall.\n';
      case 1:
        return '1 bottle of milk on the wall.\n';
      default:
        return `${number} bottles of milk on the wall.\n`;
    }
  }


  verse(number) {
    const lastNumber = number > 0 ? number - 1 : 99;

    return this.firstLine(number) +
        this.secondLine(number) +
        this.thirdLine(number) +
        this.lastLine(lastNumber);
  }

  verses(max, min) {
    const numbers = downTo(max, min);
    let verses = [];
    numbers.forEach(number => verses.push(this.verse(number)));
    return verses.join('\n');
  }

  song() {
    return this.verses(99, 0);
  }
}

export { Bottles };