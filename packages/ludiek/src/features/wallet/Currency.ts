import { z } from 'zod';
import { NumberSchema } from '#ludiek/engine/concepts/numbers/Number';

export const CurrencySchema = z.object({
  type: z.string(),
  amount: z.number().positive().or(NumberSchema),
});

export type Currency = z.infer<typeof CurrencySchema>;
