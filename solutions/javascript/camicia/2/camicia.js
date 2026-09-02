const PENALTY = { A: 4, K: 3, Q: 2, J: 1 };

const isPaymentCard = (card) => Object.hasOwn(PENALTY, card);
const other = (player) => (player === "A" ? "B" : "A");

// A player's deck as a FIFO queue with O(1) amortized take/add. Array.shift is
// O(n), which matters a lot for the very long games this puzzle is about.
class Deck {
  #cards;
  #head = 0;

  constructor(cards) {
    this.#cards = [...cards];
  }

  get size() {
    return this.#cards.length - this.#head;
  }

  // Remove and return the top card, or undefined if the deck is empty.
  take() {
    if (this.size === 0) return undefined;
    const card = this.#cards[this.#head++];
    // Reclaim consumed slots once they dominate, so memory stays bounded.
    if (this.#head > 1024 && this.#head * 2 > this.#cards.length) {
      this.#cards = this.#cards.slice(this.#head);
      this.#head = 0;
    }
    return card;
  }

  // Place cards on the bottom of the deck (loop avoids spread on huge piles).
  addAll(cards) {
    for (const card of cards) this.#cards.push(card);
  }

  // Snapshot for loop detection: number-card values don't matter, so every
  // number card collapses to "-" while payment cards keep their identity.
  stateKey() {
    let key = "";
    for (let i = this.#head; i < this.#cards.length; i++) {
      key += isPaymentCard(this.#cards[i]) ? this.#cards[i] : "-";
    }
    return key;
  }
}

/**
 * Simulate a game of Camicia (Beggar-my-neighbour).
 * @param {string[]} playerA - player A's starting deck (top card first)
 * @param {string[]} playerB - player B's starting deck (top card first)
 * @returns {{ status: "finished" | "loop", cards: number, tricks: number }}
 */
export const simulateGame = (playerA, playerB) => {
  const decks = { A: new Deck(playerA), B: new Deck(playerB) };
  const pile = [];
  const seenStates = new Set();

  let starter = "A"; // who leads the current round
  let cards = 0; // total cards played
  let tricks = 0; // times the central pile was collected

  while (true) {
    // Every round starts with an empty pile, so the two decks fully describe
    // the game here. That makes this the one sound place to check for endings:
    //   - someone already holds every card  -> finished
    //   - this exact position has occurred before -> the game loops forever
    if (decks.A.size === 0 || decks.B.size === 0) {
      return { status: "finished", cards, tricks };
    }
    const stateKey = `${decks.A.stateKey()}|${decks.B.stateKey()}`;
    if (seenStates.has(stateKey)) {
      return { status: "loop", cards, tricks };
    }
    seenStates.add(stateKey);

    // --- Play one round, until the pile is collected ---
    let turn = starter;
    let attacker = null; // who laid the last payment card
    let owed = 0; // cards the current player still owes

    while (true) {
      const card = decks[turn].take();

      // Can't play -> the opponent collects the pile.
      if (card === undefined) {
        starter = other(turn);
        break;
      }

      pile.push(card);
      cards++;

      if (isPaymentCard(card)) {
        // Playing a payment card (freely or to interrupt a penalty) makes you
        // the attacker; the opponent now owes that many cards.
        attacker = turn;
        owed = PENALTY[card];
        turn = other(turn);
      } else if (owed > 0) {
        // A number card pays off one owed card...
        owed--;
        if (owed === 0) {
          starter = attacker; // ...and clearing the debt wins the pile.
          break;
        }
        // Still owing: the same player keeps paying (turn stays put).
      } else {
        turn = other(turn); // free play: a number card just passes the turn.
      }
    }

    // Resolve the trick: the winner takes the whole pile to the bottom.
    decks[starter].addAll(pile);
    pile.length = 0;
    tricks++;
  }
};
