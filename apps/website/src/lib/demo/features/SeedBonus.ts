import z from 'zod';
import { Ludiek } from '$lib/demo/game';

/**
 * Multiplies the gain of a specific seed
 */
export const SeedBonusSchema = z.strictObject({
  type: z.literal('/bonus/seed'),
  seed: z.string(),
});

export type SeedBonus = z.infer<typeof SeedBonusSchema>;

export class SeedModifier extends Ludiek.Modifier<SeedBonus> {
  readonly schema = SeedBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  stringify(bonus: SeedBonus): string {
    return `${this.type}${bonus.seed}`;
  }
}
