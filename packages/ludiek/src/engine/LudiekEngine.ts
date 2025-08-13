import { LudiekConfig, PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseConditionShape, ConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';

export class LudiekEngine<Plugins extends LudiekPlugin[], Conditions extends LudiekCondition<BaseConditionShape>[]> {
  public plugins: PluginMap<Plugins>;
  private _conditions: Record<string, LudiekCondition<BaseConditionShape>>;

  constructor(config: LudiekConfig<Plugins, Conditions>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;

    this._conditions = Object.fromEntries(config.conditions?.map((c) => [c.type, c]) ?? []);
  }

  /**
   * Evaluate a condition and return whether it is true.
   */
  public evaluate(condition: ConditionShape<Conditions>): boolean {
    return this._conditions[condition.type].evaluate(condition);
  }
}
