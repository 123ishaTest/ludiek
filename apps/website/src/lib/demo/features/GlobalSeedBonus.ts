import z from 'zod';
import { LudiekModifier } from '@123ishatest/ludiek';

/**
 * Multiplies the gain of every seed
 */
export const GlobalSeedBonusSchema = z.strictObject({
  type: z.literal('/bonus/seed-global'),
});

export type GlobalSeedBonus = z.infer<typeof GlobalSeedBonusSchema>;

export class GlobalSeedModifier extends LudiekModifier<GlobalSeedBonus> {
  readonly schema = GlobalSeedBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: GlobalSeedBonus): string {
    return `${this.type}`;
  }
}
