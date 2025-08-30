import type { CurrencyDetail } from '$lib/demo/model/CurrencyDetail';
import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';
import type { StatisticDetail } from '$lib/demo/model/StatisticDetail';
import type { PlantDetail } from '$lib/demo/model/PlantDetail';

// TODO(@Isha): Replace with Zod parsing

// First we declare our fully static content
export const plants = [
  { id: '/plant/sunflower', name: 'Sunflower', growthTime: 1, moneyReward: 10 },
  { id: '/plant/cauliflower', name: 'Cauliflower', growthTime: 1.5, moneyReward: 20 },
] as const satisfies PlantDetail[];

export const currencies: CurrencyDetail[] = [
  { id: '/currency/money', name: 'Money', icon: '/icon/coin' },
  { id: '/currency/gems', name: 'Gems', icon: '/icon/gem-blue' },
];

export const statistics: StatisticDetail[] = [
  { id: '/statistic/total-money', type: 'scalar' },
  { id: '/statistic/plants-planted', type: 'map' },
];

export const achievements: AchievementDetail[] = [
  {
    id: '/achievement/total-money',
    condition: {
      type: 'has-currency',
      id: '/currency/money',
      amount: 30,
    },
  },
];
