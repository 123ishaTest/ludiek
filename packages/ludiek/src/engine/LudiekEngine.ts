import { LudiekConfig, PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseConditionShape, ConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';

export class LudiekEngine<Plugins extends LudiekPlugin[], Conditions extends LudiekCondition<BaseConditionShape>[]> {
  public plugins: PluginMap<Plugins>;
  private readonly _conditions: Record<string, LudiekCondition<BaseConditionShape>>;

  constructor(config: LudiekConfig<Plugins, Conditions>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;

    this._conditions = Object.fromEntries(config.conditions?.map((c) => [c.type, c]) ?? []);
  }

  /**
   * Evaluate a condition and return whether it is true.
   */
  public evaluate(condition: ConditionShape<Conditions>): boolean {
    const evaluator = this._conditions[condition.type];

    if (evaluator == null) {
      const registeredEvaluators = Object.keys(this._conditions).join(', ');
      throw new ConditionNotFoundError(
        `Cannot evaluate condition of type '${condition.type}' because its evaluator is not registered. Registered evaluators are ${registeredEvaluators}`,
      );
    }

    return this._conditions[condition.type].evaluate(condition);
  }
}
