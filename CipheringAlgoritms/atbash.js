const {START_CHAR_UPPER, END_CHAR_UPPER,
       START_CHAR_LOWER, END_CHAR_LOWER} = require('./alphabetConstants.js');

function atbash (chunk) {
  return chunk.map( (char) => {
    const flagIsInsideUpper = char >= START_CHAR_UPPER && char <= END_CHAR_UPPER;
    if (flagIsInsideUpper) {
      return END_CHAR_UPPER + START_CHAR_UPPER - char;
    }

    const flagIsInsideLower = char >= START_CHAR_LOWER && char <= END_CHAR_LOWER;
    if (flagIsInsideLower) {
      return END_CHAR_LOWER + START_CHAR_LOWER - char;
    }
    return char;
  } )
}

module.exports = atbash;
