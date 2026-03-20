import z from 'zod';

export const PlantSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  growthTime: z.number(),
  moneyReward: z.number(),
});

export type PlantDetail = z.infer<typeof PlantSchema>;
