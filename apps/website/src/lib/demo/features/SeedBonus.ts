import { type BaseBonus, LudiekModifier } from '@123ishatest/ludiek';
import type { PlantId } from '$lib/demo/demo.svelte';

/**
 * Multiplies the gain of a specific seed
 */
export interface SeedBonus extends BaseBonus {
  type: '/bonus/seed';
  seed: PlantId;
}

export class SeedModifier extends LudiekModifier<SeedBonus> {
  readonly type = '/bonus/seed';
  readonly default = 1;
  readonly variant = 'multiplicative';

  stringify(bonus: SeedBonus): string {
    return `${this.type}${bonus.seed}`;
  }
}
