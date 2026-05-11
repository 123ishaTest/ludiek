import { LudiekLogLevel } from '@ludiek/engine/logger/LudiekLogLevel';

export interface LudiekLog {
  level: LudiekLogLevel;
  timestamp: Date;
  message: string;
  data: unknown;
}
