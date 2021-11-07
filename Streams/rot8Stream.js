const { CesarStream } = require('./cesarStream.js');

class Rot8Stream extends CesarStream {
  constructor (action) {
    super();
    this.shift = 8;
    this.action = action;
  }
}

module.exports = {Rot8Stream: Rot8Stream};