const atbash = require('../CipheringAlgoritms/atbash.js');

describe('Atbash function', () => {

  chunkIn = Buffer.from('AaBbZz- !.,--АБВабв');
  chunkOut = Buffer.from('ZzYyAa- !.,--АБВабв');


  test('should encode string properly', () => {
    expect(atbash(chunkIn)).toEqual(chunkOut);
    expect(atbash(chunkOut)).toEqual(chunkIn);
  });
});