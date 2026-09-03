export class BankAccount {
  #balance = 0;
  #isOpen = false;

  #assertOpen() {
    if (!this.#isOpen) throw new ValueError("account is not open");
  }

  open() {
    if (this.#isOpen) throw new ValueError("account is already open");
    this.#isOpen = true;
  }

  close() {
    this.#assertOpen();
    this.#isOpen = false;
    this.#balance = 0;
  }

  deposit(amount) {
    this.#assertOpen();
    if (amount < 0) throw new ValueError("cannot deposit a negative amount");
    this.#balance += amount;
  }

  withdraw(amount) {
    this.#assertOpen();
    if (amount < 0) throw new ValueError("cannot withdraw a negative amount");
    if (amount > this.#balance) throw new ValueError("insufficient funds");
    this.#balance -= amount;
  }

  get balance() {
    this.#assertOpen();
    return this.#balance;
  }
}

export class ValueError extends Error {
  constructor() {
    super("Bank account error");
  }
}
