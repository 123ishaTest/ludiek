import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

/**
 * Multiplies the gain of a specific seed
 */
export interface DummyBonus extends BaseBonus {
  type: '/bonus/dummy';
  seed: string;
}

export class DummyModifier extends LudiekModifier<DummyBonus> {
  readonly type = '/bonus/dummy';
  readonly default = 1;
  readonly variant = 'multiplicative';

  stringify(bonus: DummyBonus): string {
    return `${this.type}${bonus.seed}`;
  }
}
