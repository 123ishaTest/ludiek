import { z } from 'zod';
import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export const AdditiveBonusSchema = z.strictObject({
  type: z.literal('/bonus/additive'),
});

export type AdditiveBonus = z.infer<typeof AdditiveBonusSchema>;

export class AdditiveModifier extends LudiekModifier<AdditiveBonus> {
  readonly schema = AdditiveBonusSchema;
  readonly default = 0;
  readonly variant = 'additive';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: AdditiveBonus): string {
    return `${this.type}`;
  }
}
