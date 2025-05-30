import type { CurrencyDetail } from '#ludiek/features/wallet/content/CurrencyDetail';
import type { StatisticDetail } from '#ludiek/features/statistics/content/StatisticDetail';
import type { SettingDetail } from '#ludiek/features/settings/content/SettingDetail';

// TODO(@Isha): Get from content parser?
export interface Content {
  currencies: CurrencyDetail[];
  statistics: StatisticDetail[];
  settings: SettingDetail[];
}
