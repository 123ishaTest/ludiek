import type { CurrencyDetail } from '$lib/demo/model/CurrencyDetail';
import type { AchievementDetail } from '$lib/demo/model/AchievementDetail';
import type { StatisticDetail } from '$lib/demo/model/StatisticDetail';
import type { PlantDetail } from '$lib/demo/model/PlantDetail';

// TODO(@Isha): Replace with Zod parsing

// First we declare our fully static content
export const plants = [
  {
    id: '/plant/cabbage',
    name: 'Cabbage',
    growthTime: 10,
    moneyReward: 10,
    seedCost: 6,
    stages: [
      '/plants/cabbage/cabbage_00.png',
      '/plants/cabbage/cabbage_01.png',
      '/plants/cabbage/cabbage_02.png',
      '/plants/cabbage/cabbage_03.png',
      '/plants/cabbage/cabbage_04.png',
      '/plants/cabbage/cabbage_05.png',
    ],
  },
  {
    id: '/plant/potato',
    name: 'Potato',
    growthTime: 20,
    moneyReward: 20,
    seedCost: 12,
    stages: [
      '/plants/potato/potato_00.png',
      '/plants/potato/potato_01.png',
      '/plants/potato/potato_02.png',
      '/plants/potato/potato_03.png',
      '/plants/potato/potato_04.png',
      '/plants/potato/potato_05.png',
    ],
  },
  {
    id: '/plant/carrot',
    name: 'Carrot',
    growthTime: 30,
    moneyReward: 40,
    seedCost: 20,
    stages: [
      '/plants/carrot/carrot_00.png',
      '/plants/carrot/carrot_01.png',
      '/plants/carrot/carrot_02.png',
      '/plants/carrot/carrot_03.png',
      '/plants/carrot/carrot_04.png',
      '/plants/carrot/carrot_05.png',
    ],
  },
  {
    id: '/plant/beetroot',
    name: 'Beetroot',
    growthTime: 40,
    moneyReward: 50,
    seedCost: 40,
    stages: [
      '/plants/beetroot/beetroot_00.png',
      '/plants/beetroot/beetroot_01.png',
      '/plants/beetroot/beetroot_02.png',
      '/plants/beetroot/beetroot_03.png',
      '/plants/beetroot/beetroot_04.png',
      '/plants/beetroot/beetroot_05.png',
    ],
  },
  {
    id: '/plant/radish',
    name: 'Radish',
    growthTime: 50,
    moneyReward: 20,
    seedCost: 75,
    stages: [
      '/plants/radish/radish_00.png',
      '/plants/radish/radish_01.png',
      '/plants/radish/radish_02.png',
      '/plants/radish/radish_03.png',
      '/plants/radish/radish_04.png',
      '/plants/radish/radish_05.png',
    ],
  },
  {
    id: '/plant/cauliflower',
    name: 'Cauliflower',
    growthTime: 30,
    moneyReward: 20,
    seedCost: 120,
    stages: [
      '/plants/cauliflower/cauliflower_00.png',
      '/plants/cauliflower/cauliflower_01.png',
      '/plants/cauliflower/cauliflower_02.png',
      '/plants/cauliflower/cauliflower_03.png',
      '/plants/cauliflower/cauliflower_04.png',
      '/plants/cauliflower/cauliflower_05.png',
    ],
  },
  {
    id: '/plant/pumpkin',
    name: 'Pumpkin',
    growthTime: 30,
    seedCost: 200,
    moneyReward: 20,
    stages: [
      '/plants/pumpkin/pumpkin_00.png',
      '/plants/pumpkin/pumpkin_01.png',
      '/plants/pumpkin/pumpkin_02.png',
      '/plants/pumpkin/pumpkin_03.png',
      '/plants/pumpkin/pumpkin_04.png',
      '/plants/pumpkin/pumpkin_05.png',
    ],
  },
  {
    id: '/plant/sunflower',
    name: 'Sunflower',
    growthTime: 10,
    moneyReward: 10,
    seedCost: 1000,
    stages: [
      '/plants/sunflower/sunflower_00.png',
      '/plants/sunflower/sunflower_01.png',
      '/plants/sunflower/sunflower_02.png',
      '/plants/sunflower/sunflower_03.png',
      '/plants/sunflower/sunflower_04.png',
      '/plants/sunflower/sunflower_05.png',
    ],
  },
] as const satisfies PlantDetail[];
export type PlantId = (typeof plants)[number]['id'];

export const getPlant = (id: PlantId): PlantDetail => {
  // TODO(@Isha): Make into dictionary lookup
  const plant = plants.find((p) => p.id === id);
  if (!plant) {
    throw new Error(`Plant with id '${id}' not found.`);
  }
  return plant;
};

export const currencies: CurrencyDetail[] = [
  { id: '/currency/money', name: 'Money', icon: '/icons/egg.png' },
  { id: '/currency/compost', name: 'Compost', icon: '/icon/compost' },
];

export type CurrencyId = (typeof currencies)[number]['id'];

export const getCurrency = (id: CurrencyId): CurrencyDetail => {
  // TODO(@Isha): Make into dictionary lookup
  const currency = currencies.find((c) => c.id === id);
  if (!currency) {
    throw new Error(`Currency with id '${id}' not found.`);
  }
  return currency;
};

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
