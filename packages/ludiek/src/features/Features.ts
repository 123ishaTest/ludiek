import type { Wallet } from '#ludiek/features/wallet/Wallet';
import type { Statistics } from '#ludiek/features/statistics/Statistics';
import type { Settings } from '#ludiek/features/settings/Settings';

export interface Features {
  wallet: Wallet;
  statistics: Statistics;
  settings: Settings;
}
