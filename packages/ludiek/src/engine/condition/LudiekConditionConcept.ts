import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { cloneDeep } from 'es-toolkit';
import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';

export class LudiekConditionConcept<const Evaluators extends readonly LudiekEvaluator[]> extends LudiekEngineConcept<
  LudiekEvaluator,
  Evaluators
> {
  public raiseNotfoundError(type: string, registeredContributions: string[]) {
    throw new ConditionNotFoundError(
      `Cannot evaluate condition of type '${type}' because its evaluator is not registered. Registered evaluators are: ${registeredContributions.join(', ')}`,
    );
  }

  public evaluate(condition: LudiekCondition<Evaluators> | LudiekCondition<Evaluators>[]): boolean {
    if (!Array.isArray(condition)) {
      condition = [condition];
    }

    return condition.every((condition) => {
      const evaluator = this.get(condition.type);
      const modified = evaluator.modify(cloneDeep(condition));
      return evaluator.evaluate(modified);
    });
  }

  public modify<Condition extends LudiekCondition<Evaluators>>(condition: Condition): Condition {
    const evaluator = this.get(condition.type);
    return evaluator.modify(cloneDeep(condition)) as Condition;
  }
}
