import z from 'zod';
import { ContentSchema } from '@louter/core/types';

export const UpgradeSchema = ContentSchema.extend({
  id: z.string(),
  name: z.string(),
  cost: z.strictObject({
    currency: z.string(),
    amount: z.number().default(4),
  }),
});
