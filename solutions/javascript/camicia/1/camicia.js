const PENALTY = { A: 4, K: 3, Q: 2, J: 1 };

const isPaymentCard = (card) => Object.hasOwn(PENALTY, card);

// The game ends when the central pile is empty and one player holds every card.
const onePlayerHasAllCards = (aCount, bCount, pileCount) =>
  pileCount === 0 && (aCount === 0 || bCount === 0);

// Loop detection ignores the value of number cards, so each card becomes a
// symbol: payment cards keep their identity, number cards collapse to "-".
const toStateSymbol = (card) => (isPaymentCard(card) ? card : "-");
const deckStateKey = (deck) => deck.map(toStateSymbol).join("");

const checkGameEnd = (gameState, gameStats) => {
  // End 1: a player collected all the cards -> game finished.
  if (
    onePlayerHasAllCards(
      gameState.playerADeck.length,
      gameState.playerBDeck.length,
      gameState.centralPile.length,
    )
  ) {
    gameStats.status = "finished";
    return true;
  }

  // End 2: both decks match a state already seen (with no penalty pending) ->
  // the game loops forever. A Set gives O(1) lookups instead of scanning.
  const stateKey = `${deckStateKey(gameState.playerADeck)}|${deckStateKey(gameState.playerBDeck)}`;
  if (gameState.penaltyDue === 0 && gameState.seenDeckStates.has(stateKey)) {
    gameStats.status = "loop";
    return true;
  }
  gameState.seenDeckStates.add(stateKey);

  return false;
};

// The player on turn couldn't pay (or ran out of cards), so the opponent who
// laid the last payment card collects the central pile: a "trick".
const collectTrick = (gameState, gameStats) => {
  const trickCards = gameState.centralPile.splice(0);
  const winnerDeck =
    gameState.playerTurn === "A" ? "playerBDeck" : "playerADeck";
  gameState[winnerDeck].push(...trickCards);
  gameStats.tricks++;
  gameState.playerTurn = gameState.playerTurn === "A" ? "B" : "A";
  gameState.penaltyInProgress = false;
};

/**
 * Simulate a game of Camicia (Beggar-my-neighbour).
 * @param {string[]} playerA - player A's starting deck (top card first)
 * @param {string[]} playerB - player B's starting deck (top card first)
 * @returns {{ status: string, cards: number, tricks: number }}
 */
export const simulateGame = (playerA, playerB) => {
  const gameStats = { status: "created", cards: 0, tricks: 0 };
  const gameState = {
    centralPile: [],
    playerADeck: [...playerA],
    playerBDeck: [...playerB],
    playerTurn: "A",
    seenDeckStates: new Set(),
    penaltyDue: 0,
    penaltyInProgress: false,
  };

  while (true) {
    const isPlayerATurn = gameState.playerTurn === "A";
    const opponentTurn = isPlayerATurn ? "B" : "A";

    // Stop as soon as someone wins or the position repeats.
    if (checkGameEnd(gameState, gameStats)) break;

    // The player on turn plays the top card of their deck onto the pile.
    const currentCard = isPlayerATurn
      ? gameState.playerADeck.shift()
      : gameState.playerBDeck.shift();

    if (currentCard) {
      gameState.centralPile.push(currentCard);
      gameStats.cards += 1;
    } else {
      // The current player ran out of cards -> trick
      collectTrick(gameState, gameStats);
    }

    // Number card.
    if (!isPaymentCard(currentCard)) {
      // Penalty in progress
      if (gameState.penaltyDue > 0) {
        gameState.penaltyDue--; // pays off one of the owed cards
      } else {
        gameState.playerTurn = opponentTurn; // simply pass the turn
      }

      // Payment card
    } else {
      gameState.penaltyInProgress = true;
      gameState.penaltyDue = PENALTY[currentCard];
      gameState.playerTurn = opponentTurn;
    }

    // A penalty paid down to 0 means the player who laid the last payment card
    // collects the central pile.
    if (gameState.penaltyDue === 0 && gameState.penaltyInProgress) {
      collectTrick(gameState, gameStats);
    }
  }

  return gameStats;
};
