import { type BaseBonus, LudiekModifier } from '@123ishatest/ludiek';

/**
 * Multiplies the gain of every seed
 */
export interface GlobalSeedBonus extends BaseBonus {
  type: '/bonus/seed-global';
}

export class GlobalSeedModifier extends LudiekModifier<GlobalSeedBonus> {
  readonly type = '/bonus/seed-global';
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: GlobalSeedBonus): string {
    return `${this.type}`;
  }
}
