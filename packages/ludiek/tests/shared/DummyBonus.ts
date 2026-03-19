import { z } from 'zod';
import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export const DummyBonusSchema = z.strictObject({
  type: z.literal('/bonus/dummy'),
});

export type DummyBonus = z.infer<typeof DummyBonusSchema>;

export class DummyModifier extends LudiekModifier<DummyBonus> {
  readonly schema = DummyBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: DummyBonus): string {
    return `${this.type}`;
  }
}
