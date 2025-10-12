import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface MultiplicativeBonus extends BaseBonus {
  type: '/bonus/multiplicative';
}

export class MultiplicativeModifier extends LudiekModifier<MultiplicativeBonus> {
  readonly type = '/bonus/multiplicative';
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: MultiplicativeBonus): string {
    return `${this.type}`;
  }
}
