import { z } from 'zod';

export const StatisticDetailSchema = z
  .strictObject({
    id: z.string(),
    name: z.string(),
    icon: z.string(),
  })
  .meta({
    title: 'Statistic',
    examples: [
      {
        id: '/stat/money-gained',
        name: 'Money Gained',
        icon: '/icon/money',
      },
    ],
  });

export type StatisticDetail = z.infer<typeof StatisticDetailSchema>;
