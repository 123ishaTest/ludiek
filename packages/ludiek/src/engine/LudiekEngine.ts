import { LudiekConfig, PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseConditionShape, ConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ConditionNotFoundError } from '@ludiek/engine/LudiekError';

export class LudiekEngine<Plugins extends LudiekPlugin[], Conditions extends LudiekCondition<BaseConditionShape>[]> {
  public plugins: PluginMap<Plugins>;
  private readonly _conditions: Record<string, LudiekCondition<BaseConditionShape>>;

  constructor(config: LudiekConfig<Plugins, Conditions>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;

    // Inject the engine into all plugins so they can access core concepts
    config.plugins?.forEach((plugin) => plugin.inject(this));

    this._conditions = Object.fromEntries(config.conditions?.map((c) => [c.type, c]) ?? []);
  }

  public get conditions(): LudiekCondition<BaseConditionShape>[] {
    return Object.values(this._conditions);
  }

  /**
   * Evaluate one or multiple conditions and evaluates whether they are all true.
   */
  public evaluate(condition: ConditionShape<Conditions> | ConditionShape<Conditions>[]): boolean {
    if (!Array.isArray(condition)) {
      condition = [condition];
    }

    return condition.every((condition) => {
      const evaluator = this._conditions[condition.type];

      if (evaluator == null) {
        const registeredEvaluators = Object.keys(this._conditions).join(', ');
        throw new ConditionNotFoundError(
          `Cannot evaluate condition of type '${condition.type}' because its evaluator is not registered. Registered evaluators are: ${registeredEvaluators}`,
        );
      }
      return evaluator.evaluate(condition);
    });
  }

  // Saving and loading
  public save(): object {
    const data: Record<string, object> = {};

    this.pluginList.forEach((plugin) => {
      data[plugin.name] = plugin.save();
    });

    return data;
  }

  public load(data: Record<string, object>): void {
    this.pluginList.forEach((plugin) => {
      const state = data[plugin.name];
      if (state) {
        plugin.load(state);
      }
    });
  }

  private get pluginList(): LudiekPlugin[] {
    return Object.values(this.plugins);
  }
}
