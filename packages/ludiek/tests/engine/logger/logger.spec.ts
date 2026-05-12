import { afterAll, describe, expect, it, vi } from 'vitest';
import { LudiekLogger } from '@ludiek/engine/logger/LudiekLogger';
import { LudiekLogLevel } from '@ludiek/engine/logger/LudiekLogLevel';

describe('Ludiek Logger', () => {
  const debugMock = vi.spyOn(console, 'debug').mockImplementation(() => undefined);
  const infoMock = vi.spyOn(console, 'info').mockImplementation(() => undefined);
  const warnMock = vi.spyOn(console, 'warn').mockImplementation(() => undefined);
  const errorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  afterAll(() => {
    debugMock.mockReset();
    infoMock.mockReset();
    warnMock.mockReset();
    errorMock.mockReset();
  });

  it('initializes empty', () => {
    // Arrange
    const logger = new LudiekLogger();

    // Act
    const logs = logger.getLogs();

    // Assert
    expect(logs).toHaveLength(0);
  });

  it('logs debug messages', () => {
    // Arrange
    const logger = new LudiekLogger();

    // Act
    logger.debug('debug');
    const logs = logger.getLogs();
    const debugLog = logs[0];

    // Assert
    expect(logs).toHaveLength(1);
    expect(debugLog).toEqual({
      level: LudiekLogLevel.Debug,
      message: 'debug',
      timestamp: expect.any(Date),
    });
  });

  it('logs info messages', () => {
    // Arrange
    const logger = new LudiekLogger();

    // Act
    logger.info('info');
    const logs = logger.getLogs();
    const infoLog = logs[0];

    // Assert
    expect(logs).toHaveLength(1);
    expect(infoLog).toEqual({
      level: LudiekLogLevel.Info,
      message: 'info',
      timestamp: expect.any(Date),
    });
  });

  it('logs warning messages', () => {
    // Arrange
    const logger = new LudiekLogger();

    // Act
    logger.warn('warn');
    const logs = logger.getLogs();
    const warnLog = logs[0];

    // Assert
    expect(logs).toHaveLength(1);
    expect(warnLog).toEqual({
      level: LudiekLogLevel.Warn,
      message: 'warn',
      timestamp: expect.any(Date),
    });
  });

  it('logs error messages', () => {
    // Arrange
    const logger = new LudiekLogger();

    // Act
    logger.error('error');
    const logs = logger.getLogs();
    const errorLog = logs[0];

    // Assert
    expect(logs).toHaveLength(1);
    expect(errorLog).toEqual({
      level: LudiekLogLevel.Error,
      message: 'error',
      timestamp: expect.any(Date),
    });
  });

  it('retrieves logs in chronological order', () => {
    // Arrange
    const logger = new LudiekLogger();
    logger.debug('debug');
    logger.warn('warn');

    // Act
    const logs = logger.getLogs();

    // Assert
    expect(logs[0].message).toEqual('debug');
    expect(logs[1].message).toEqual('warn');
  });
  it('can log to console when so configured', () => {
    // Arrange
    const logger = new LudiekLogger({
      toConsole: true,
    });

    // Act
    logger.debug('debug', 1);
    logger.info('info', 'data');
    logger.warn('warn', ['1']);
    logger.error('error', { key: 1 });

    // Assert
    expect(debugMock).toHaveBeenCalledOnce();
    expect(debugMock).toHaveBeenLastCalledWith('debug', 1);
    expect(infoMock).toHaveBeenCalledOnce();
    expect(infoMock).toHaveBeenLastCalledWith('info', 'data');
    expect(warnMock).toHaveBeenCalledOnce();
    expect(warnMock).toHaveBeenLastCalledWith('warn', ['1']);
    expect(errorMock).toHaveBeenCalledOnce();
    expect(errorMock).toHaveBeenLastCalledWith('error', { key: 1 });
  });

  it('filters on log level', () => {
    // Arrange
    const logger = new LudiekLogger();
    logger.info('info1');
    logger.warn('warning');

    // Act
    const warnings = logger.getLogs(LudiekLogLevel.Warn);
    const infos = logger.getLogs(LudiekLogLevel.Info);

    // Assert
    expect(warnings).toHaveLength(1);
    expect(warnings[0].level).toBe(LudiekLogLevel.Warn);
    expect(infos).toHaveLength(2);
    expect(infos[0].level).toBe(LudiekLogLevel.Info);
  });

  it('limits the amount of logs returned', () => {
    // Arrange
    const logger = new LudiekLogger();
    for (let i = 0; i < 20; i++) {
      logger.debug('message' + i);
    }

    // Act
    const logs = logger.getLogs(LudiekLogLevel.Debug, 10);

    // Assert
    expect(logs).toHaveLength(10);
  });

  it('gets the 10 latest of each type', () => {
    // Arrange
    const logger = new LudiekLogger();
    for (let i = 0; i < 10; i++) {
      logger.debug('message' + i);
      logger.error('error' + i);
    }

    // Act
    const logs = logger.getLogs(LudiekLogLevel.Error, 10);

    // Assert
    expect(logs).toHaveLength(10);
  });
});
