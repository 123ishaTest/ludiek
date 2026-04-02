import z from 'zod';
import { Ludiek } from '$lib/demo/ludiek';

/**
 * Multiplies the gain of every seed
 */
export const GlobalSeedBonusSchema = z.strictObject({
  type: z.literal('/bonus/seed-global'),
});

export type GlobalSeedBonus = z.infer<typeof GlobalSeedBonusSchema>;

export class GlobalSeedModifier extends Ludiek.modifier<GlobalSeedBonus>() {
  readonly schema = GlobalSeedBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: GlobalSeedBonus): string {
    return `${this.type}`;
  }
}
