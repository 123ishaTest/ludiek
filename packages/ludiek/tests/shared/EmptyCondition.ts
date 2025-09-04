import { LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';

export interface EmptyConditionShape extends LudiekCondition {
  type: '/condition/empty';
}

export class EmptyCondition implements LudiekCondition<EmptyConditionShape> {
  readonly type = '/condition/empty';

  constructor() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(condition: EmptyConditionShape): boolean {
    return true;
  }
}
