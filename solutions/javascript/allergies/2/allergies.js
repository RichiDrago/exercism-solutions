const ALLERGENS = [
  "eggs",
  "peanuts",
  "shellfish",
  "strawberries",
  "tomatoes",
  "chocolate",
  "pollen",
  "cats",
];

export class Allergies {
  constructor(score) {
    this.allergicItems = ALLERGENS.filter((_, i) => (score >> i) & 1);
  }

  list() {
    return this.allergicItems;
  }

  allergicTo(item) {
    return this.allergicItems.includes(item);
  }
}
