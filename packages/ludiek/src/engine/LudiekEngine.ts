import { LudiekConfig, PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseConditionShape, ConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { ConditionNotFoundError, InputNotFoundError, OutputNotFoundError } from '@ludiek/engine/LudiekError';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { InputShape, LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput, OutputShape } from '@ludiek/engine/transactions/LudiekOutput';
import { LudiekTransaction } from '@ludiek/engine/transactions/LudiekTransaction';

export class LudiekEngine<
  Plugins extends LudiekPlugin[],
  Conditions extends LudiekCondition[],
  Inputs extends LudiekInput[],
  Outputs extends LudiekOutput[],
> {
  public plugins: PluginMap<Plugins>;
  private readonly _conditions: Record<string, LudiekCondition>;
  private readonly _inputs: Record<string, LudiekInput>;
  private readonly _outputs: Record<string, LudiekOutput>;

  constructor(config: LudiekConfig<Plugins, Conditions, Inputs, Outputs>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;

    // Inject the engine into all plugins so they can access core concepts
    config.plugins?.forEach((plugin) => plugin.inject(this));

    this._conditions = Object.fromEntries(config.conditions?.map((c) => [c.type, c]) ?? []);
    this._inputs = Object.fromEntries(config.inputs?.map((i) => [i.type, i]) ?? []);
    this._outputs = Object.fromEntries(config.outputs?.map((o) => [o.type, o]) ?? []);
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

  public handleTransaction(transaction: LudiekTransaction<Inputs, Outputs, Conditions>): boolean {
    if (transaction.requirement && !this.evaluate(transaction.requirement)) {
      return false;
    }

    if (transaction.input && !this.canLoseInput(transaction.input)) {
      return false;
    }

    if (transaction.output && !this.canGainOutput(transaction.output)) {
      return false;
    }

    if (transaction.input) {
      this.loseInput(transaction.input);
    }

    if (transaction.output) {
      this.gainOutput(transaction.output);
    }
    return true;
  }

  /**
   * Checks whether we can lose the input
   * @param input
   */
  public canLoseInput(input: InputShape<Inputs> | InputShape<Inputs>[]): boolean {
    if (!Array.isArray(input)) {
      input = [input];
    }

    return input.every((i) => {
      const processor = this._inputs[i.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._inputs).join(', ');
        throw new InputNotFoundError(
          `Cannot process input of type '${i.type}' because its processor is not registered. Registered processors are: ${registeredProcessors}`,
        );
      }
      return processor.canLose(i);
    });
  }

  /**
   * Loses the input with no regards for whether we can lose it.
   * @param input
   */
  public loseInput(input: InputShape<Inputs> | InputShape<Inputs>[]): void {
    if (!Array.isArray(input)) {
      input = [input];
    }

    input.forEach((i) => {
      const processor = this._inputs[i.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._inputs).join(', ');
        throw new InputNotFoundError(
          `Cannot process input of type '${i.type}' because its processor is not registered. Registered processors are: ${registeredProcessors}`,
        );
      }
      processor.lose(i);
    });
  }

  /**
   * Checks whether we can gain the output
   * @param output
   */
  public canGainOutput(output: OutputShape<Outputs> | OutputShape<Outputs>[]): boolean {
    if (!Array.isArray(output)) {
      output = [output];
    }

    return output.every((o) => {
      const processor = this._outputs[o.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._outputs).join(', ');
        throw new OutputNotFoundError(
          `Cannot process output of type '${o.type}' because its processor is not registered. Registered processors are: ${registeredProcessors}`,
        );
      }
      return processor.canGain(o);
    });
  }

  /**
   * Gains the output with no regards for whether we can take it.
   * @param output
   */
  public gainOutput(output: OutputShape<Outputs> | OutputShape<Outputs>[]): void {
    if (!Array.isArray(output)) {
      output = [output];
    }

    output.forEach((o) => {
      const processor = this._outputs[o.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._outputs).join(', ');
        throw new OutputNotFoundError(
          `Cannot process output of type '${o.type}' because its processor is not registered. Registered processors are: ${registeredProcessors}`,
        );
      }
      processor.gain(o);
    });
  }

  // Saving and loading
  public save(): LudiekEngineSaveData {
    const data: LudiekEngineSaveData = {};

    this.pluginList.forEach((plugin) => {
      data[plugin.name] = plugin.save();
    });

    return data;
  }

  public load(data: LudiekEngineSaveData): void {
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
