import z from 'zod';
import { LudiekModifier } from '@123ishatest/ludiek';
import { PlantIdSchema } from '$lib/demo/content';

/**
 * Multiplies the gain of a specific seed
 */
export const SeedBonusSchema = z.strictObject({
  type: z.literal('/bonus/seed'),
  seed: PlantIdSchema,
});

export type SeedBonus = z.infer<typeof SeedBonusSchema>;

export class SeedModifier extends LudiekModifier<SeedBonus> {
  readonly schema = SeedBonusSchema;
  readonly default = 1;
  readonly variant = 'multiplicative';

  stringify(bonus: SeedBonus): string {
    return `${this.type}${bonus.seed}`;
  }
}
