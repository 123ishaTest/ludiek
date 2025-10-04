import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer, LudiekOutput } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekRequest';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';

export class LudiekEngine<
  Plugins extends readonly LudiekPlugin[] = [],
  Evaluators extends readonly LudiekEvaluator[] = [],
  Consumers extends readonly LudiekConsumer[] = [],
  Producers extends readonly LudiekProducer[] = [],
  Controllers extends readonly LudiekController[] = [],
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

  public get evaluators(): Evaluators {
    return Object.values(this._evaluators) as unknown as Evaluators;
  }

  public get consumers(): Consumers {
    return Object.values(this._consumers) as unknown as Consumers;
  }

  public get producers(): Producers {
    return Object.values(this._producers) as unknown as Producers;
  }

  public get controllers(): Controllers {
    return Object.values(this._controllers) as unknown as Controllers;
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
  public evaluate(condition: LudiekCondition<Evaluators> | LudiekCondition<Evaluators>[]): boolean {
    if (!Array.isArray(condition)) {
      condition = [condition];
    }

    return condition.every((condition) => {
      const evaluator = this.getEvaluator(condition.type);
      return evaluator.evaluate(condition);
    });
  }

  public request(request: LudiekRequest<Controllers>): void {
    const controller = this.getController(request.type);
    controller.resolve(request);
  }

  public handleTransaction(
    transaction: LudiekTransaction<LudiekInput<Consumers>, LudiekOutput<Producers>, LudiekCondition<Evaluators>>,
  ): boolean {
    if (transaction.requirement && !this.evaluate(transaction.requirement)) {
      return false;
    }

    if (transaction.input && !this.canConsume(transaction.input)) {
      return false;
    }

    if (transaction.output && !this.canProduce(transaction.output)) {
      return false;
    }

    if (transaction.input) {
      this.consume(transaction.input);
    }

    if (transaction.output) {
      this.produce(transaction.output);
    }
    return true;
  }

  /**
   * Checks whether we can consume the input
   * @param input
   */
  public canConsume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): boolean {
    if (!Array.isArray(input)) {
      input = [input];
    }

    return input.every((i) => {
      const consumer = this.getConsumer(i.type);
      return consumer.canConsume(i);
    });
  }

  /**
   * Consume the input with no regards for whether we can consume it.
   * @param input
   */
  public consume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): void {
    if (!Array.isArray(input)) {
      input = [input];
    }

    input.forEach((i) => {
      const processor = this.getConsumer(i.type);
      processor.consume(i);
    });
  }

  /**
   * Checks whether we can produce the output
   * @param output
   */
  public canProduce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): boolean {
    if (!Array.isArray(output)) {
      output = [output];
    }

    return output.every((o) => {
      const producer = this.getProducer(o.type);
      return producer.canProduce(o);
    });
  }

  /**
   * Produce the output with no regards for whether we can take it.
   * @param output
   */
  public produce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): void {
    if (!Array.isArray(output)) {
      output = [output];
    }

    output.forEach((o) => {
      const producer = this.getProducer(o.type);
      producer.produce(o);
    });
  }

  /**
   * Get an evaluator or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private getEvaluator(type: string): LudiekEvaluator {
    const evaluator = this._evaluators[type];

    if (evaluator == null) {
      const registeredEvaluators = Object.keys(this._evaluators).join(', ');
      throw new ConditionNotFoundError(
        `Cannot evaluate condition of type '${type}' because its evaluator is not registered. Registered evaluators are: ${registeredEvaluators}`,
      );
    }
    return evaluator;
  }

  /**
   * Get a producer or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private getProducer(type: string): LudiekProducer {
    const producer = this._producers[type];

    if (producer == null) {
      const registeredProcessors = Object.keys(this._producers).join(', ');
      throw new OutputNotFoundError(
        `Cannot process output of type '${type}' because its processor is not registered. Registered processors are: ${registeredProcessors}`,
      );
    }
    return producer;
  }

  /**
   * Get a consumer or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private getConsumer(type: string): LudiekConsumer {
    const consumer = this._consumers[type];

    if (consumer == null) {
      const registeredConsumers = Object.keys(this._consumers).join(', ');
      throw new InputNotFoundError(
        `Cannot consumee input of type '${type}' because its consumer is not registered. Registered consumers are: ${registeredConsumers}`,
      );
    }
    return consumer;
  }

  /**
   * Get a controller or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private getController(type: string): LudiekController {
    const controller = this._controllers[type];
    if (!controller) {
      const registeredControllers = Object.keys(this._controllers).join(', ');
      throw new ControllerNotFoundError(
        `Cannot resolve request of type '${type}' because its controller is not registered. Registered controllers are: ${registeredControllers}`,
      );
    }
    return controller;
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
