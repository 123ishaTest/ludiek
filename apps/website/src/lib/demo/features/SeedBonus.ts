import z from 'zod';
import { CustomModifier } from '@123ishatest/ludiek';

/**
 * Multiplies the gain of a specific seed
 */
export const SeedBonusSchema = z.strictObject({
  type: z.literal('/bonus/seed'),
  seed: z.string(),
});

export type SeedBonus = z.infer<typeof SeedBonusSchema>;

export class SeedModifier extends CustomModifier<SeedBonus> {
  readonly schema = SeedBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  stringify(bonus: SeedBonus): string {
    return `${this.type}${bonus.seed}`;
  }
}
