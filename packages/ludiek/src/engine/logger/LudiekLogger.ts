import { LudiekLog } from '@ludiek/engine/logger/LudiekLog';
import { LudiekLogLevel } from '@ludiek/engine/logger/LudiekLogLevel';
import { toMerged } from 'es-toolkit';

export interface LudiekLoggerConfig {
  /**
   * Whether to also emit the logs to the console
   */
  toConsole: boolean;
}

export class LudiekLogger {
  private readonly _logs: LudiekLog[] = [];
  private readonly _config: LudiekLoggerConfig;

  constructor(config: Partial<LudiekLoggerConfig> = {}) {
    this._config = toMerged(
      {
        toConsole: false,
      },
      config,
    );
  }

  public debug(message: string, data?: unknown): void {
    if (this.toConsole) {
      console.debug(message, data);
    }
    this.log(LudiekLogLevel.Debug, message, data);
  }

  public info(message: string, data?: unknown): void {
    if (this.toConsole) {
      console.info(message, data);
    }
    this.log(LudiekLogLevel.Info, message, data);
  }

  public warn(message: string, data?: unknown): void {
    if (this.toConsole) {
      console.warn(message, data);
    }
    this.log(LudiekLogLevel.Warn, message, data);
  }

  public error(message: string, data?: unknown): void {
    if (this.toConsole) {
      console.error(message, data);
    }
    this.log(LudiekLogLevel.Error, message, data);
  }

  /**
   * Retrieve the last `n` logs that are of the `minimumLevel`
   * @param minimumLevel
   * @param n
   */
  public getLogs(minimumLevel = LudiekLogLevel.Debug, n: number = Infinity): LudiekLog[] {
    const logs: LudiekLog[] = [];
    for (let i = this._logs.length - 1; i >= 0; i--) {
      if (this._logs[i].level >= minimumLevel) {
        logs.push(this._logs[i]);

        if (logs.length === n) {
          break;
        }
      }
    }
    return logs.reverse();
  }

  private log(level: LudiekLogLevel, message: string, data?: unknown): void {
    const log: LudiekLog = {
      level,
      message,
      data,
      timestamp: new Date(),
    };
    this.addLog(log);
  }

  private addLog(log: LudiekLog): void {
    this._logs.push(log);
  }

  private get toConsole(): boolean {
    return this._config.toConsole;
  }
}
