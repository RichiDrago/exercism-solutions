export class Robot {
  // Static
  static names = this.#shuffle(this.#generateAllNames());

  static #generateAllNames() {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
    const numbers = "0123456789".split("");
    const names = [];

    for (const l1 of letters) {
      for (const l2 of letters) {
        for (const n1 of numbers) {
          for (const n2 of numbers) {
            for (const n3 of numbers) {
              names.push(`${l1}${l2}${n1}${n2}${n3}`);
            }
          }
        }
      }
    }

    return names;
  }

  static #shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // swap
    }
    return array;
  }

  static releaseNames() {
    Robot.names = this.#shuffle(this.#generateAllNames());
  }

  // Constructor
  constructor() {
    this._name = Robot.names.pop();
  }

  // Getters
  get name() {
    return this._name;
  }

  // Public
  reset() {
    this._name = Robot.names.pop();
  }
}
