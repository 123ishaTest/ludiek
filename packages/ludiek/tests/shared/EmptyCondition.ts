import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';

export interface EmptyConditionShape extends LudiekCondition {
  type: '/condition/empty';
}

export class EmptyCondition extends LudiekCondition<EmptyConditionShape> {
  readonly type = '/condition/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  evaluate(condition: EmptyConditionShape): boolean {
    return true;
  }
}
