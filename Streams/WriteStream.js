const { Writable } = require('stream');
const fs = require('fs');

class WriteStream extends Writable {
  constructor(filename) {
    super();
    this.filename = filename;
  }
  _construct(done) {
    fs.open(this.filename, 'a', (err, fd) => {
      if (err) {
        done(err);
      } else {
        this.fd = fd;
        done();
      }
    });
  }
  _write(chunk, encoding, done) {
    fs.appendFile(this.fd, chunk, done);
  }
  _destroy(err, done) {
    if (this.fd) {
      fs.close(this.fd, (er) => done(er || err));
    } else {
      done(err);
    }
  }
}

module.exports = {WriteStream: WriteStream};
