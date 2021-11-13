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
      if (char + shiftValue < START_CHAR_UPPER) {
        return char + shiftValue + ALPHABET_LENGTH;
      }
      if (char + shiftValue > END_CHAR_UPPER) {
        return char + shiftValue - ALPHABET_LENGTH;
      }
      return char + shiftValue;
    }

    const flagIsInsideLower = char >= START_CHAR_LOWER && char <= END_CHAR_LOWER;
    if (flagIsInsideLower) {
      if (char + shiftValue < START_CHAR_LOWER) {
        return char + shiftValue + ALPHABET_LENGTH;
      }
      if (char + shiftValue > END_CHAR_LOWER) {
        return char + shiftValue - ALPHABET_LENGTH;
      }
      return char + shiftValue;
    }
    return char;
  } )
}

module.exports = cesar;
