import { RequirementSchema } from '$lib/ludiek/engine/concepts/requirements/RequirementSchema';
import { z } from 'zod';

export const CurrencyRequirementSchema = RequirementSchema.extend({
  type: z.literal('currency'),
  currency: z.string(),
  amount: z.number().positive(),
});

export type CurrencyRequirement = z.infer<typeof CurrencyRequirementSchema>;
