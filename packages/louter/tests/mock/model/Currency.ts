import z from 'zod';
import { ContentSchema } from '@louter/core/types';

export const CurrencySchema = ContentSchema.extend({
  id: z.string(),
  name: z.string(),
});
