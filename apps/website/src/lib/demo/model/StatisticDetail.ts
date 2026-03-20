import z from 'zod';

export const StatisticDetailSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  type: z.enum(['scalar', 'map']),
});

export type StatisticDetail = z.infer<typeof StatisticDetailSchema>;
