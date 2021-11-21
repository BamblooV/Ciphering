

describe('Config validation', () => {

  beforeEach(() => {
    jest.resetModules();
  })

  test('if no config values should show Error message', () => {
    const mockExit = jest.spyOn(process, 'exit').
      mockImplementation(() => { });
    const mockStderr = jest.spyOn(process.stderr, 'write').
      mockImplementation(() => { });

    process.argv = [1, 2];

    require('../validateConfig.js');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('There are no console args');
  });

  test('if wrong config value should show Error message', () => {
    const mockExit = jest.spyOn(process, 'exit').
      mockImplementation(() => { });
    const mockStderr = jest.spyOn(process.stderr, 'write').
      mockImplementation(() => { });

    process.argv = ['1', '2', '-c', 'A1'];

    const config = require('../validateConfig.js');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('There are wrong config args, available: C1,C0,R1,R0,A');
  });

  test('if wrong config value should show Error message', () => {
    const mockExit = jest.spyOn(process, 'exit').
      mockImplementation(() => { });
    const mockStderr = jest.spyOn(process.stderr, 'write').
      mockImplementation(() => { });

    process.argv = ['1', '2', '-i', 'input.txt'];

    const config = require('../validateConfig.js');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('Wrong config, -c with args are necessary');
  });

  test('if no config args show error message', () => {
    const mockExit = jest.spyOn(process, 'exit').
      mockImplementation(() => { });
    const mockStderr = jest.spyOn(process.stderr, 'write').
      mockImplementation(() => { });

    process.argv = ['1', '2', '-c'];

    const config = require('../validateConfig.js');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith(`Wrong config args, try 'C1-R1-A'`);
  });

  test('if use same config flags twice should show Error message', () => {
    const mockExit = jest.spyOn(process, 'exit').
      mockImplementation(() => { });
    const mockStderr = jest.spyOn(process.stderr, 'write').
      mockImplementation(() => { });

    process.argv = ['1', '2', '-c', 'A', '--config', 'C0-C1'];

    const config = require('../validateConfig.js');

    expect(mockExit).toHaveBeenLastCalledWith(1);
    expect(mockStderr).toHaveBeenLastCalledWith('There are duplicate of console args');
  });


  test('should work with alliases', () => {
    process.argv = ['1', '2', '--input', 'InputStr',
      '--output', 'OutputStr',
      '--config', 'C1'];

    const config = require('../validateConfig.js');

    expect(config)
      .toEqual({
        inputValue: 'InputStr',
        outputValue: 'OutputStr',
        configValue: ['C1']
      });
  });

  test('should work with short names', () => {
    process.argv = ['1', '2', '-i', 'InputStr',
      '-o', 'OutputStr',
      '-c', 'C1'];

    const config = require('../validateConfig.js');

    expect(config)
      .toEqual({
        inputValue: 'InputStr',
        outputValue: 'OutputStr',
        configValue: ['C1']
      });
  });


});