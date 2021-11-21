const { inputValue: input, outputValue: output, configValue: config} = require('../validateConfig');
const fs = require('fs');
const path = require('path');
const { CesarStream } = require('./cesarStream.js');
const { Rot8Stream } = require('./rot8Stream.js');
const { AtbahStream } = require('./atbashStream.js');
const { ReadStream } = require('./ReadStream.js');
const { WriteStream } = require('./WriteStream.js');

const streams = []


if (input) {
  try {
  const pathToFile = path.resolve(input);
  fs.accessSync(pathToFile);
  streams.push(new ReadStream(pathToFile));
  }
  catch (error) {
    process.stderr.write('Input file don`t exist');
    process.exit(1);
  }
} else {
  streams.push(process.stdin);
}

Array.prototype.push.apply(streams, config.map( element => {
  if (element[0] === 'C') {
    return (parseInt(element[1], 10)) ? new CesarStream('encode') : new CesarStream('decode');
    }
  if (element[0] === 'R') {
    return (parseInt(element[1], 10)) ? new Rot8Stream('encode') : new Rot8Stream('decode');
  }
  if (element[0] === 'A') {
    return new AtbahStream();
  }
}));

if (output) {
  try {
    const pathToFile = path.resolve(output);
    fs.accessSync(pathToFile);
    streams.push(new WriteStream(pathToFile));
  } catch (error) {
    process.stderr.write('Output file don`t exist');
    process.exit(1);
  }
} else {
  streams.push(process.stdout);
}


module.exports = { streams };
