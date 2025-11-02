import type { CurrencyDetail } from '$lib/demo/model/CurrencyDetail';
import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';
import type { StatisticDetail } from '$lib/demo/model/StatisticDetail';
import type { PlantDetail } from '$lib/demo/model/PlantDetail';
import type { SkillDetail } from '$lib/demo/model/SkillDetail';

// TODO(@Isha): Replace with Zod parsing

// First we declare our fully static content
export const plants = [
  { id: '/plant/sunflower', name: 'Sunflower', growthTime: 1, moneyReward: 10 },
  { id: '/plant/cauliflower', name: 'Cauliflower', growthTime: 1.5, moneyReward: 20 },
] as const satisfies PlantDetail[];

export const currencies: CurrencyDetail[] = [
  { id: '/currency/money', name: 'Money', icon: '/icons/nugget-yellow.png' },
  { id: '/currency/gems', name: 'Gems', icon: '/icons/sapphire.png' },
];

export const statistics: StatisticDetail[] = [
  { id: '/statistic/total-money', type: 'scalar', name: 'Total money gained' },
  { id: '/statistic/plants-planted', type: 'map', name: 'Plants planted' },
];

export const achievements: AchievementDetail[] = [
  {
    id: '/achievement/total-money',
    condition: {
      type: '/condition/has-currency',
      id: '/currency/money',
      amount: 30,
    },
  },
];

export const skills = [
  { id: '/skill/farming', name: 'Farming', experiencePerLevel: [0, 0, 3, 9, 18, 30, 45, 63, 84] },
] satisfies SkillDetail[];

export const content = {
  getCurrency: (id: string) => currencies.find((c) => c.id === id) as CurrencyDetail,
  getStatistic: (id: string) => statistics.find((s) => s.id === id) as StatisticDetail,
  getSkill: (id: string) => skills.find((s) => s.id === id) as SkillDetail,
};
