import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EngineConditionShape, LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { EngineInputShape, LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { EngineOutputShape, LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { EngineRequestShape, LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';

export class LudiekEngine<
  Plugins extends LudiekPlugin[] | undefined = undefined,
  Conditions extends LudiekCondition[] | undefined = undefined,
  Inputs extends LudiekInput[] | undefined = undefined,
  Outputs extends LudiekOutput[] | undefined = undefined,
  Controllers extends LudiekController[] | undefined = undefined,
> {
  public plugins: PluginMap<Plugins>;
  private readonly _conditions: Record<string, LudiekCondition>;
  private readonly _inputs: Record<string, LudiekInput>;
  private readonly _outputs: Record<string, LudiekOutput>;
  private readonly _controllers: Record<string, LudiekController>;

  constructor(config: LudiekEngineConfig<Plugins, Conditions, Inputs, Outputs, Controllers>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;

    this._conditions = Object.fromEntries(config.conditions?.map((c) => [c.type, c]) ?? []);
    this._inputs = Object.fromEntries(config.inputs?.map((i) => [i.type, i]) ?? []);
    this._outputs = Object.fromEntries(config.outputs?.map((o) => [o.type, o]) ?? []);
    this._controllers = Object.fromEntries(config.controllers?.map((c) => [c.type, c]) ?? []);

    // Inject the engine into all plugins so they can access core concepts
    config.plugins?.forEach((plugin) => {
      plugin.inject(this as LudiekEngine<LudiekPlugin[], LudiekCondition[], LudiekInput[], LudiekOutput[]>);

      plugin.config.conditions?.forEach((c) => this.registerCondition(c));
      plugin.config.inputs?.forEach((i) => this.registerInput(i));
      plugin.config.outputs?.forEach((o) => this.registerOutput(o));
      plugin.config.controllers?.forEach((c) => this.registerController(c));
    });
  }

  public registerCondition(condition: LudiekCondition): void {
    this._conditions[condition.type] = condition;
  }

  public registerInput(input: LudiekInput): void {
    this._inputs[input.type] = input;
  }

  public registerOutput(output: LudiekOutput): void {
    this._outputs[output.type] = output;
  }

  public registerController(controller: LudiekController): void {
    this._controllers[controller.type] = controller;
  }

  /**
   * Evaluate one or multiple condition and evaluates whether they are all true.
   */
  public evaluate(
    condition: EngineConditionShape<Plugins, Conditions> | EngineConditionShape<Plugins, Conditions>[],
  ): boolean {
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

  public request(request: EngineRequestShape<Plugins, Controllers>): void {
    const controller = this._controllers[request.type];
    if (!controller) {
      const registeredResolvers = Object.keys(this._controllers).join(', ');
      throw new ControllerNotFoundError(
        `Cannot resolve request of type '${request.type}' because its resolver is not registered. Registered processors are: ${registeredResolvers}`,
      );
    }

    controller.resolve(request);
  }

  public handleTransaction(
    transaction: LudiekTransaction<
      EngineInputShape<Plugins, Inputs>,
      EngineOutputShape<Plugins, Outputs>,
      EngineConditionShape<Plugins, Conditions>
    >,
  ): boolean {
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
  public canLoseInput(input: EngineInputShape<Plugins, Inputs> | EngineInputShape<Plugins, Inputs>[]): boolean {
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
  public loseInput(input: EngineInputShape<Plugins, Inputs> | EngineInputShape<Plugins, Inputs>[]): void {
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
  public canGainOutput(output: EngineOutputShape<Plugins, Outputs> | EngineOutputShape<Plugins, Outputs>[]): boolean {
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
  public gainOutput(output: EngineOutputShape<Plugins, Outputs> | EngineOutputShape<Plugins, Outputs>[]): void {
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

  public get pluginList(): LudiekPlugin[] {
    return Object.values(this.plugins);
  }
}
