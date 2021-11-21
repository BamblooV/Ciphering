const {START_CHAR_UPPER, END_CHAR_UPPER,
        START_CHAR_LOWER, END_CHAR_LOWER,
        ALPHABET_LENGTH} = require('./alphabetConstants.js');

function cesar(chunk, shift, mode) {
  if (!(mode === 'decode') && !(mode === 'encode')) {
    process.stderr.write('ERROR: wrong mode property, only "decode" or "encode"');
    process.exit(1);
  }
  const shiftValue = (mode === 'encode') ? shift % 26 : -(shift % 26)
  return chunk.map( (char) => {

    const flagIsInsideUpper = char >= START_CHAR_UPPER && char <= END_CHAR_UPPER;
    if (flagIsInsideUpper) {
      return Shift(char, shiftValue, START_CHAR_UPPER, END_CHAR_UPPER, ALPHABET_LENGTH)
    }

    const flagIsInsideLower = char >= START_CHAR_LOWER && char <= END_CHAR_LOWER;
    if (flagIsInsideLower) {
      return Shift(char, shiftValue, START_CHAR_LOWER, END_CHAR_LOWER, ALPHABET_LENGTH)
    }

    return char;
  } )
}

function Shift(char, shiftValue, leftBorder, rightBorder, AlphabetSize) {
  if (char + shiftValue < leftBorder) {
    return char + shiftValue + AlphabetSize;
  }
  if (char + shiftValue > rightBorder) {
    return char + shiftValue - AlphabetSize;
  }
  return char + shiftValue;
}

module.exports = cesar;
