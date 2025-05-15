import { z } from 'zod';

export const CurrencyDetailSchema = z
  .strictObject({
    id: z.string().describe('Hrid of the currency'),
    name: z.string().describe('Display name'),
    icon: z.string().default('/icon/unknown').describe('Path to the icon'),
  })
  .meta({
    title: 'Currency',
    description: 'Description of a currency',
  });

export type CurrencyDetail = z.infer<typeof CurrencyDetailSchema>;
