import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface DummyBonus extends BaseBonus {
  type: '/bonus/dummy';
}

export class DummyModifier extends LudiekModifier<DummyBonus> {
  readonly type = '/bonus/dummy';
  readonly default = 1;
  readonly variant = 'multiplicative';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  stringify(bonus: DummyBonus): string {
    return `${this.type}`;
  }
}
