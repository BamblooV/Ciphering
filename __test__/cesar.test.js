const cesar = require('../CipheringAlgoritms/cesar.js');

describe('Cesar function', () => {

  chunkIn = Buffer.from('AaBbZz- !.,--АБВабв');
  chunkCesarOut = Buffer.from('BbCcAa- !.,--АБВабв');
  chunkRotOut = Buffer.from('IiJjHh- !.,--АБВабв');

  test('should encode string properly', () => {
    expect(cesar(chunkIn, 1, 'encode')).toEqual(chunkCesarOut);
    expect(cesar(chunkIn, 8, 'encode')).toEqual(chunkRotOut);
  });
  test('should decode string properly', () => {
    expect(cesar(chunkCesarOut, 1, 'decode')).toEqual(chunkIn);
    expect(cesar(chunkRotOut, 8, 'decode')).toEqual(chunkIn);
  });
  test('should shut down if wrong mode', () => {
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const mockStderr = jest.spyOn(process.stderr, 'write').
    mockImplementation(() => {});

    cesar(chunkCesarOut, 1, 'ecode');

    expect(mockExit).toHaveBeenCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('ERROR: wrong mode property, only "decode" or "encode"');
  });
});