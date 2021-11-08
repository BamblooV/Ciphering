let consoleArgs = process.argv.slice(2);
const propertyObj = {
  inputValue: null,
  outputValue: null,
  configValue: null
};

const aliases = {
  '--config': '-c',
  '--input': '-i',
  '--output': '-o'
};

const configMask = ['C1','C0','R1','R0','A'];

if (consoleArgs.length == 0) {
  process.stderr.write('There are no console args');
  process.exit(1);
}

consoleArgs = consoleArgs.map(arg => {
  if (Object.keys(aliases).includes(arg)) {
    return aliases[arg];
  } else {
    return arg;
  }
});

const set = new Set(consoleArgs);
if (set.size !== consoleArgs.length) {
  process.stderr.write('There are duplicate of console args');
  process.exit(1);
};

if (consoleArgs.includes('-c')) {
  const flagIndex = consoleArgs.indexOf('-c');
  try {
    propertyObj.configValue = consoleArgs[flagIndex + 1].split('-').map(element => {
      if (!configMask.includes(element)) {
        process.stderr.write(`There are wrong config args, available: ${configMask}`);
        process.exit(1);
      } else {
        return element;
      }
    });
  } catch (error) {
    process.stderr.write(`Wrong config args, try 'C1-R1-A'`);
    process.exit(1);
  }

};

if (consoleArgs.includes('-i')) {
  const flagIndex = consoleArgs.indexOf('-i');
  propertyObj.inputValue = consoleArgs[flagIndex + 1];
};

if (consoleArgs.includes('-o')) {
  const flagIndex = consoleArgs.indexOf('-o');
  propertyObj.outputValue = consoleArgs[flagIndex + 1];
};

module.exports = propertyObj;