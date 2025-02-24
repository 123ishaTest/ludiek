import {
  type CurrencyRequirement,
  CurrencyRequirementSchema,
} from '$lib/ludiek/features/wallet/requirements/CurrencyRequirement';
import { RequirementDefinition } from '$lib/ludiek/engine/concepts/requirements/RequirementDefinition';
import type { Features } from '$lib/ludiek/features/Features';

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
