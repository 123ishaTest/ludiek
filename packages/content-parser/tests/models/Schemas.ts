import { z } from 'zod';

export const ItemDetailSchema = z
  .object({
    hrid: z.string(),
    name: z.string(),
    description: z.string(),
    icon: z.string(),
  })
  .strict();

export const LootDetailSchema = z
  .object({
    hrid: z.string(),
    items: z.array(
      z.object({
        // TODO(@Isha): Make ids reference each other
        hrid: z.string(),
        weight: z.number().min(1),
      }),
    ),
  })
  .strict();