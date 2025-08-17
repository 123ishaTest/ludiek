import type { CurrencyDetail } from '$lib/demo/model/CurrencyDetail';
import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';
import type { StatisticDetail } from '$lib/demo/model/StatisticDetail';
import type { PlantDetail } from '$lib/demo/model/PlantDetail';
import type { PlantId } from '$lib/demo/demo.svelte';

// TODO(@Isha): Replace with Zod parsing

// First we declare our fully static content
export const plants = [
  {
    id: '/plant/sunflower',
    name: 'Sunflower',
    growthTime: 10,
    moneyReward: 10,
    stages: [
      '/plants/sunflower/sunflower_00.png',
      '/plants/sunflower/sunflower_01.png',
      '/plants/sunflower/sunflower_02.png',
      '/plants/sunflower/sunflower_03.png',
      '/plants/sunflower/sunflower_04.png',
      '/plants/sunflower/sunflower_05.png',
    ],
  },
  {
    id: '/plant/cauliflower',
    name: 'Cauliflower',
    growthTime: 30,
    moneyReward: 20,
    stages: [
      '/plants/cauliflower/cauliflower_00.png',
      '/plants/cauliflower/cauliflower_01.png',
      '/plants/cauliflower/cauliflower_02.png',
      '/plants/cauliflower/cauliflower_03.png',
      '/plants/cauliflower/cauliflower_04.png',
      '/plants/cauliflower/cauliflower_05.png',
    ],
  },
] as const satisfies PlantDetail[];

export const getPlant = (id: PlantId): PlantDetail => {
  // TODO(@Isha): Make into dictionary lookup
  const plant = plants.find((p) => p.id === id);
  if (!plant) {
    throw new Error(`Plant with id '${id}' not found.`);
  }
  return plant;
};

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
