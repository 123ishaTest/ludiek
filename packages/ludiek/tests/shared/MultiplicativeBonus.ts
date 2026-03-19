import { z } from 'zod';
import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export const MultiplicativeBonusSchema = z.strictObject({
  type: z.literal('/bonus/multiplicative'),
});

export type MultiplicativeBonus = z.infer<typeof MultiplicativeBonusSchema>;

export class MultiplicativeModifier extends LudiekModifier<MultiplicativeBonus> {
  readonly schema = MultiplicativeBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: MultiplicativeBonus): string {
    return `${this.type}`;
  }
}
