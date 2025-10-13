import { DummyModifier } from '@tests/shared/DummyBonus';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

export interface ModifiedCondition {
  type: '/condition/modified';
  value: number;
}

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * An evaluator that has a modifier and only evaluates to true if that bonus is >1
 */
export class ModifiedEvaluator extends LudiekEvaluator<ModifiedCondition, Dependencies> {
  readonly type = '/condition/modified';

  modify(condition: ModifiedCondition): ModifiedCondition {
    condition.value /= this.getBonus({ type: '/bonus/dummy' });
    return super.modify(condition);
  }

  evaluate(condition: ModifiedCondition): boolean {
    return condition.value < 1;
  }
}
