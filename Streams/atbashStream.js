const { Transform } = require('stream');
const atbash = require('../CipheringAlgoritms/atbash.js');

class AtbahStream extends Transform {
  _transform(chunk, encoding, done) {
    try {
      this.push(atbash(chunk), encoding);
      done();
    } catch (error) {
      console.error('Error in AtbashStream: ', error);
      done(error);
    }

  }
}
module.exports = {AtbahStream: AtbahStream};