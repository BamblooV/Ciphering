const { Transform } = require('stream');
const cesar = require('../CipheringAlgoritms/cesar.js');
const action = 'encode';

class CesarStream extends Transform {
  constructor (action) {
    super();

    this.shift = 1;
    this.action = action;
  }
  _transform(chunk, encoding, done) {
    try {
      this.push(cesar(chunk, this.shift, this.action), encoding);
      done();
    } catch (error) {
      console.error('Error in CesarStream: ', error);
      done(error);
    }

  }
}
module.exports = {CesarStream: CesarStream};
