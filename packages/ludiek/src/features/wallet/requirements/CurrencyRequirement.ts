import { z } from 'zod';
import { RequirementDefinition, RequirementSchema } from '#ludiek/engine/concepts/requirements/Requirement';
import type { Features } from '#ludiek/features/Features';

export const CurrencyRequirementSchema = RequirementSchema.extend({
  type: z.literal('currency'),
  currency: z.string(),
  amount: z.number().positive(),
})
  .meta({
    title: 'CurrencyRequirement',
    description: 'Whether the Wallet has the required amount of a Currency',
    examples: [
      {
        type: 'currency',
        currency: '/currency/money',
        amount: 2,
      },
    ],
  })
  .brand<'requirement'>();

export type CurrencyRequirement = z.infer<typeof CurrencyRequirementSchema>;

export class CurrencyRequirementDefinition extends RequirementDefinition {
  key = 'currency';

  schema = CurrencyRequirementSchema;

  isFulfilled(requirement: CurrencyRequirement, features: Features): boolean {
    return features.wallet.hasCurrency({
      amount: requirement.amount,
      type: requirement.currency,
    });
  }
}
