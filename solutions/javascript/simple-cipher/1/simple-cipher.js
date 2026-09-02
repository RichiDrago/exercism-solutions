const ALPHABET = "abcdefghijklmnopqrstuvwxyz";
const ALPHABET_SIZE = ALPHABET.length;

export class Cipher {
  constructor(key = "abcdefghij") {
    this._key = key;
  }

  encode(plainText) {
    let encodedText = "";
    for (let i = 0; i < plainText.length; i++) {
      const plainChar = plainText[i];
      const plainCharIndex = ALPHABET.indexOf(plainChar);
      const keyCharIndex = ALPHABET.indexOf(this._key[i % this._key.length]);
      const encodedChar =
        ALPHABET[(plainCharIndex + keyCharIndex) % ALPHABET_SIZE];
      encodedText += encodedChar;
    }
    return encodedText;
  }

  decode(encryptedText) {
    let decodedText = "";
    for (let i = 0; i < encryptedText.length; i++) {
      const encryptedChar = encryptedText[i];
      const encryptedCharIndex = ALPHABET.indexOf(encryptedChar);
      const keyCharIndex = ALPHABET.indexOf(this._key[i % this._key.length]);
      const decodedChar =
        ALPHABET[
          (encryptedCharIndex - keyCharIndex + ALPHABET_SIZE) % ALPHABET_SIZE
        ];
      decodedText += decodedChar;
    }
    return decodedText;
  }

  get key() {
    return this._key;
  }
}
