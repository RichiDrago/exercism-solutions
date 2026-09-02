const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_SIZE = ALPHABET.length;

const CHAR_TO_INDEX = Object.fromEntries(
  ALPHABET.split("").map((c, i) => [c, i]),
);

export class Cipher {
  constructor(key = "abcdefghij") {
    this._key = key;

    this._keyIndexes = Array.from(key, (c) => CHAR_TO_INDEX[c]);
  }

  encode(plainText) {
    let encodedText = "";

    for (let i = 0; i < plainText.length; i++) {
      const plainIndex = CHAR_TO_INDEX[plainText[i]];
      const keyIndex = this._keyIndexes[i % this._keyIndexes.length];

      encodedText += ALPHABET[(plainIndex + keyIndex) % ALPHABET_SIZE];
    }

    return encodedText;
  }

  decode(encryptedText) {
    let decodedText = "";

    for (let i = 0; i < encryptedText.length; i++) {
      const encryptedIndex = CHAR_TO_INDEX[encryptedText[i]];
      const keyIndex = this._keyIndexes[i % this._keyIndexes.length];

      decodedText +=
        ALPHABET[(encryptedIndex - keyIndex + ALPHABET_SIZE) % ALPHABET_SIZE];
    }

    return decodedText;
  }

  get key() {
    return this._key;
  }
}
