export class Robot {
  // Static
  static names = new Set();

  static releaseNames() {
    Robot.names = new Set();
  }

  // Private
  #name;

  #generateRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  #generateRandomName() {
    const letters =
      String.fromCharCode(this.#generateRandomNumber(65, 91)) +
      String.fromCharCode(this.#generateRandomNumber(65, 91));
    const digits = this.#generateRandomNumber(100, 1000);
    const randomName = `${letters}${digits}`;

    if (Robot.names.has(randomName)) {
      return this.#generateRandomName();
    }

    return randomName;
  }

  // Constructor
  constructor() {
    this.#name = this.#generateRandomName();
    Robot.names.add(this.#name);
  }

  // Getters
  get name() {
    return this.#name;
  }

  // Public
  reset() {
    this.#name = this.#generateRandomName();
    Robot.names.add(this.#name);
  }
}
