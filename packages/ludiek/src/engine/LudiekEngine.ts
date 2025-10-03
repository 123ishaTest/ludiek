import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { Condition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { Input, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer, Output } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { LudiekController, Request } from '@ludiek/engine/request/LudiekRequest';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';

export class LudiekEngine<
  Plugins extends readonly LudiekPlugin[],
  Evaluators extends readonly LudiekEvaluator[],
  Consumers extends readonly LudiekConsumer[],
  Producers extends readonly LudiekProducer[],
  Controllers extends readonly LudiekController[],
> {
  public plugins: PluginMap<Plugins>;
  private readonly _evaluators: Record<string, LudiekEvaluator> = {};
  private readonly _consumers: Record<string, LudiekConsumer> = {};
  private readonly _producers: Record<string, LudiekProducer> = {};
  private readonly _controllers: Record<string, LudiekController> = {};

  constructor(config: LudiekEngineConfig<Plugins, Evaluators, Consumers, Producers, Controllers>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;
    config.plugins?.forEach((p) => p.inject(this));

    config.evaluators?.forEach((c) => this.registerEvaluator(c));
    config.consumers?.forEach((i) => this.registerConsumer(i));
    config.producers?.forEach((o) => this.registerProducer(o));
    config.controllers?.forEach((c) => this.registerController(c));
  }

  public registerEvaluator(evaluator: LudiekEvaluator): void {
    evaluator.inject(this);
    this._evaluators[evaluator.type] = evaluator;
  }

  public registerConsumer(consumer: LudiekConsumer): void {
    consumer.inject(this);
    this._consumers[consumer.type] = consumer;
  }

  public registerProducer(producer: LudiekProducer): void {
    producer.inject(this);
    this._producers[producer.type] = producer;
  }

  public registerController(controller: LudiekController): void {
    controller.inject(this);
    this._controllers[controller.type] = controller;
  }

  /**
   * Evaluate one or multiple condition and evaluates whether they are all true.
   */
  public evaluate(condition: Condition<Evaluators> | Condition<Evaluators>[]): boolean {
    if (!Array.isArray(condition)) {
      condition = [condition];
    }

    return condition.every((condition) => {
      const evaluator = this._evaluators[condition.type];

      if (evaluator == null) {
        const registeredEvaluators = Object.keys(this._evaluators).join(', ');
        throw new ConditionNotFoundError(
          `Cannot evaluate condition of type '${condition.type}' because its evaluator is not registered. Registered evaluators are: ${registeredEvaluators}`,
        );
      }
      return evaluator.evaluate(condition);
    });
  }

  public request(request: Request<Controllers>): void {
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
    transaction: LudiekTransaction<Input<Consumers>, Output<Producers>, Condition<Evaluators>>,
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
  public canLoseInput(input: Input<Consumers> | Input<Consumers>[]): boolean {
    if (!Array.isArray(input)) {
      input = [input];
    }

    return input.every((i) => {
      const processor = this._consumers[i.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._consumers).join(', ');
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
  public loseInput(input: Input<Consumers> | Input<Consumers>[]): void {
    if (!Array.isArray(input)) {
      input = [input];
    }

    input.forEach((i) => {
      const processor = this._consumers[i.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._consumers).join(', ');
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
  public canGainOutput(output: Output<Producers> | Output<Producers>[]): boolean {
    if (!Array.isArray(output)) {
      output = [output];
    }

    return output.every((o) => {
      const processor = this._producers[o.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._producers).join(', ');
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
  public gainOutput(output: Output<Producers> | Output<Producers>[]): void {
    if (!Array.isArray(output)) {
      output = [output];
    }

    output.forEach((o) => {
      const processor = this._producers[o.type];

      if (processor == null) {
        const registeredProcessors = Object.keys(this._producers).join(', ');
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
