const ITEMS_SCORE = {
  1: "eggs",
  2: "peanuts",
  4: "shellfish",
  8: "strawberries",
  16: "tomatoes",
  32: "chocolate",
  64: "pollen",
  128: "cats",
};

function highestPowerOf2(n) {
  return 2 ** Math.floor(Math.log2(n));
}

export class Allergies {
  constructor(score) {
    const items = [];

    let remaining = score;
    let power = highestPowerOf2(score);

    while (remaining > 0) {
      if (power <= remaining) {
        if (ITEMS_SCORE[power]) items.push(ITEMS_SCORE[power]);
        remaining -= power;
      }
      power /= 2;
    }

    this.allergicItems = items.reverse();
  }

  list() {
    return this.allergicItems;
  }

  allergicTo(item) {
    return this.allergicItems.includes(item);
  }
}
