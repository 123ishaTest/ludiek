import { EvaluatorSchemas, LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import z, { ZodDiscriminatedUnion, ZodNever } from 'zod';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { cloneDeep } from 'es-toolkit';
import { AnyEngine } from '@ludiek/util/types';

export class LudiekConditionConcept<const Evaluators extends readonly LudiekEvaluator[]> {
  private readonly _evaluators: Record<string, LudiekEvaluator> = {};
  private readonly _engine: AnyEngine;

  constructor(_engine: AnyEngine) {
    this._engine = _engine;
  }

  public register(evaluator: LudiekEvaluator): void {
    evaluator.inject(this._engine);
    this._evaluators[evaluator.type] = evaluator;
  }

  /**
   * Evaluate one or multiple condition and evaluates whether they are all true.
   */
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

  /**
   * Get an evaluator or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private get(type: string): LudiekEvaluator {
    const evaluator = this._evaluators[type];

    if (evaluator == null) {
      const registeredEvaluators = Object.keys(this._evaluators).join(', ');
      throw new ConditionNotFoundError(
        `Cannot evaluate condition of type '${type}' because its evaluator is not registered. Registered evaluators are: ${registeredEvaluators}`,
      );
    }
    return evaluator;
  }

  public modify<Condition extends LudiekCondition<Evaluators>>(condition: Condition): Condition {
    const evaluator = this.get(condition.type);
    return evaluator.modify(cloneDeep(condition)) as Condition;
  }

  public get list(): Evaluators {
    return Object.values(this._evaluators) as unknown as Evaluators;
  }

  public get schema(): ZodNever | ZodDiscriminatedUnion<EvaluatorSchemas<Evaluators>, 'type'> {
    const schemas = this.list.map((e) => e.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }
}
