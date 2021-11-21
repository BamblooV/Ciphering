

describe('Streams:', () => {

  afterEach(() => {
    jest.resetModules();
  })

  test('should create all transform streams and streams, which work with console', () => {
    const { CesarStream } = require('../Streams/cesarStream');
    const { Rot8Stream } = require('../Streams/rot8Stream.js');
    const { AtbahStream } = require('../Streams/atbashStream.js');
    const { Readable, Writable } = require('stream');

    jest.mock('../validateConfig.js', () => {
      return {
        inputValue: null,
        outputValue: null,
        configValue: ['C0', 'C1', 'R0', 'R1', 'A']
      }
    });

    const { streams } = require('../Streams/Streams');

    expect(streams[0]).toBeInstanceOf(Readable);
    expect(streams[1]).toBeInstanceOf(CesarStream);
    expect(streams[2]).toBeInstanceOf(CesarStream);
    expect(streams[3]).toBeInstanceOf(Rot8Stream);
    expect(streams[4]).toBeInstanceOf(Rot8Stream);
    expect(streams[5]).toBeInstanceOf(AtbahStream);
    expect(streams[6]).toBeInstanceOf(Writable);
  });

  test('should create streams, which work with files', () => {
    const { AtbahStream } = require('../Streams/atbashStream.js');
    const { ReadStream } = require('../Streams/ReadStream.js');
    const { WriteStream } = require('../Streams/WriteStream.js');

    jest.mock('../validateConfig.js', () => {
      return {
        inputValue: 'input.txt',
        outputValue: 'output.txt',
        configValue: ['A']
      }
    });

    const { streams } = require('../Streams/Streams');

    expect(streams[0]).toBeInstanceOf(ReadStream);
    expect(streams[1]).toBeInstanceOf(AtbahStream);
    expect(streams[2]).toBeInstanceOf(WriteStream);
  });

  test('should exit if input file don`t exist', () => {
    const mockExit = jest.spyOn(process, 'exit').
    mockImplementation(() => {});
    const mockStderr = jest.spyOn(process.stderr, 'write').
    mockImplementation(() => {});

    jest.mock('../validateConfig.js', () => {
      return {
        inputValue: 'input1.txt',
        outputValue: null,
        configValue: ['A']
      }
    });

    const { streams } = require('../Streams/Streams');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('Input file don`t exist');
  });

  test('should exit if output file don`t exist', () => {
    const mockExit = jest.spyOn(process, 'exit').
    mockImplementation(() => {});
    const mockStderr = jest.spyOn(process.stderr, 'write').
    mockImplementation(() => {});

    jest.mock('../validateConfig.js', () => {
      return {
        inputValue: null,
        outputValue: 'output1.txt',
        configValue: ['A']
      }
    });

    const { streams } = require('../Streams/Streams');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('Output file don`t exist');
  });
});