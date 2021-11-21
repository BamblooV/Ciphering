const { spawn } = require('child_process');
describe('App should pass this sccenaries', () => {
  describe('if use same config flags twice should ', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-c', 'C1-C1-A-R0', '-c', 'C0'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe('There are duplicate of console args');
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });

  describe('if use same config flags twice should ', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-c', 'C1-C1-A-R0', '-c', 'C0'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe('There are duplicate of console args');
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });

  describe('if use no config flags should ', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-i', 'input.txt'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe(`Wrong config, -c with args are necessary`);
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });

  describe('if use wrong input path should ', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-i', 'inpu1t.txt', '-c', 'A'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe('Input file don`t exist');
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });

  describe('if use wronp output path should ', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-o', 'output1.txt', '-c', 'A'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe('Output file don`t exist');
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });

  describe('if user use -c with wrong args should', () => {
    let child;
    beforeEach(() => {
      argv = ['1', '2', '-i', 'input.txt', '-c', 'A-B'];
      child = spawn('node', ['ciphering.js', ...argv]);
    })
    test('show Error message', done => {
      child.stderr.on('data', (data) => {
        const mess = data.toString().trim();
        expect(mess).toBe(`There are wrong config args, available: C1,C0,R1,R0,A`);
        done();
      })
    });
    test('exit with code 1', done => {
      child.on('exit', (errorCode) => {
        expect(errorCode).toBe(1);
        done();
      })
    });
  });
});