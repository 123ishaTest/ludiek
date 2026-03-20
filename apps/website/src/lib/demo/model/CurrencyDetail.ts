import z from 'zod';

export const CurrencyDetailSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export type CurrencyDetail = z.infer<typeof CurrencyDetailSchema>;
