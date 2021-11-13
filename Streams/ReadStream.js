const { Readable } = require('stream');
const fs = require('fs');

class ReadStream extends Readable {
  constructor(filename) {
    super();
    this.filename = filename;
    this.fd = null;
  }
  _construct(done) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        done(err);
      } else {
        this.fd = fd;
        done();
      }
    });
  }
  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }
  _destroy(err, done) {
    if (this.fd) {
      fs.close(this.fd, (er) => done(er || err));
    } else {
      done(err);
    }
  }
}

module.exports = {ReadStream: ReadStream};