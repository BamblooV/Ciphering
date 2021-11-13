const { inputValue: input, outputValue: output, configValue: config} = require('./validateConfig');
const fs = require('fs');
const path = require('path');
const { pipeline } = require('stream');
const { CesarStream } = require('./Streams/cesarStream.js');
const { Rot8Stream } = require('./Streams/rot8Stream.js');
const { AtbahStream } = require('./Streams/atbashStream.js');
const { ReadStream } = require('./Streams/ReadStream.js');
const { WriteStream } = require('./Streams/WriteStream.js');
const { error } = require('console');

let input_stream;
if (input) {
  try {
  const accesFile = fs.accessSync(path.join(__dirname, input));
  input_stream = new ReadStream(path.join(__dirname, input));
  }
  catch (error) {
    process.stderr.write('Input file don`t exist');
    process.exit(1);
  }
} else {
  input_stream = process.stdin;
}

let output_stream;
if (output) {
  try {
    const accesFile = fs.accessSync(path.join(__dirname, output));
    output_stream = new WriteStream(path.join(__dirname, output));
  } catch (error) {
    process.stderr.write('Output file don`t exist');
    process.exit(1);
  }
} else {
  output_stream = process.stdout;
}

const streams = config.map( element => {
  if (element[0] === 'C') {
    return (parseInt(element[1], 10)) ? new CesarStream('encode') : new CesarStream('decode');
    }
  if (element[0] === 'R') {
    return (parseInt(element[1], 10)) ? new Rot8Stream('encode') : new Rot8Stream('decode');
  }
  if (element[0] === 'A') {
    return new AtbahStream();
  }
});

pipeline(
  input_stream,
  ...streams,
  output_stream,
  (error) => {
    if (error) {
      console.error(error);
    } else {
      console.log('The line was written successfully');
    }
  }
)