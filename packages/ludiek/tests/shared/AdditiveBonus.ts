import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface AdditiveBonus extends BaseBonus {
  type: '/bonus/additive';
}

export class AdditiveModifier extends LudiekModifier<AdditiveBonus> {
  readonly type = '/bonus/additive';
  readonly default = 0;
  readonly variant = 'additive';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: AdditiveBonus): string {
    return `${this.type}`;
  }
}
