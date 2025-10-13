import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekRequest';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';
import { LudiekBonus, LudiekModifier, BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';
import { ModifierNotFoundError } from '@ludiek/engine/modifier/ModifierError';
import { cloneDeep } from 'es-toolkit';

export class LudiekEngine<
  Plugins extends readonly LudiekPlugin[] = [],
  Evaluators extends readonly LudiekEvaluator[] = [],
  Consumers extends readonly LudiekConsumer[] = [],
  Producers extends readonly LudiekProducer[] = [],
  Controllers extends readonly LudiekController[] = [],
  Modifiers extends readonly LudiekModifier[] = [],
> {
  public plugins: PluginMap<Plugins>;
  private readonly _evaluators: Record<string, LudiekEvaluator> = {};
  private readonly _consumers: Record<string, LudiekConsumer> = {};
  private readonly _producers: Record<string, LudiekProducer> = {};
  private readonly _controllers: Record<string, LudiekController> = {};
  private readonly _modifiers: Record<string, LudiekModifier> = {};
  private readonly _activeBonuses: Record<string, Record<string, BonusContribution[]>>;

  constructor(
    config: LudiekEngineConfig<Plugins, Evaluators, Consumers, Producers, Controllers, Modifiers>,
    state = {},
  ) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;
    config.plugins?.forEach((p) => p.inject(this));

    config.evaluators?.forEach((c) => this.registerEvaluator(c));
    config.consumers?.forEach((i) => this.registerConsumer(i));
    config.producers?.forEach((o) => this.registerProducer(o));
    config.controllers?.forEach((c) => this.registerController(c));
    config.modifiers?.forEach((m) => this.registerModifier(m));

    this._activeBonuses = state;
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

  public get modifiers(): Modifiers {
    return Object.values(this._modifiers) as unknown as Modifiers;
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

  public registerModifier(modifier: LudiekModifier): void {
    modifier.inject(this);
    this._modifiers[modifier.type] = modifier;
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
      const modified = evaluator.modify(cloneDeep(condition));
      return evaluator.evaluate(modified);
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
      const modified = consumer.modify(cloneDeep(i));
      return consumer.canConsume(modified);
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
      const modified = processor.modify(cloneDeep(i));
      processor.consume(modified);
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
      const modified = producer.modify(cloneDeep(o));
      return producer.canProduce(modified);
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
      const modified = producer.modify(cloneDeep(o));
      producer.produce(modified);
    });
  }

  public getBonus(bonus: LudiekBonus<Modifiers>): number {
    // TODO(@Isha): Should this be cached between ticks too?
    const modifier = this.getModifier(bonus.type);

    const identifier = modifier.stringify(bonus);
    const values = Object.values(this._activeBonuses).flatMap((record) => {
      return record[identifier] ?? [];
    });

    switch (modifier.variant) {
      case 'additive':
        return values.reduce((sum, modifier) => sum + modifier.amount, modifier.default);
      case 'multiplicative':
        return values.reduce((sum, modifier) => sum * (1 + modifier.amount), modifier.default);
      default:
        console.error(`Unknown variant '${modifier.variant}' for resolver ${modifier}`);
        return 0;
    }
  }

  /**
   * Collects all bonuses from plugins and stores them in a local dictionary
   * @private
   */
  private collectBonuses(): void {
    // TODO(@Isha): Check all features too

    this.pluginList.forEach((plugin) => {
      // Reset all previous bonuses
      this._activeBonuses[plugin.name] = {};

      const bonuses = plugin.getBonuses?.();

      bonuses?.forEach((bonus) => {
        const modifier = this.getModifier(bonus.type);
        const identifier = modifier.stringify(bonus);
        if (this._activeBonuses[plugin.name][identifier]) {
          this._activeBonuses[plugin.name][identifier].push(bonus);
        } else {
          this._activeBonuses[plugin.name][identifier] = [bonus];
        }
      });
    });
  }

  public modifyCondition<Condition extends LudiekCondition<Evaluators>>(condition: Condition): Condition {
    const evaluator = this.getEvaluator(condition.type);
    return evaluator.modify(cloneDeep(condition)) as Condition;
  }

  public modifyInput<Input extends LudiekInput<Consumers>>(input: Input): Input {
    const consumer = this.getConsumer(input.type);
    return consumer.modify(cloneDeep(input)) as Input;
  }

  public modifyOutput<Output extends LudiekOutput<Producers>>(output: Output): Output {
    const producer = this.getProducer(output.type);
    return producer.modify(cloneDeep(output)) as Output;
  }

  public get activeBonuses(): Record<string, Record<string, BonusContribution[]>> {
    return this._activeBonuses;
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
        `Cannot consume input of type '${type}' because its consumer is not registered. Registered consumers are: ${registeredConsumers}`,
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

  /**
   * Get a modifier or throw an error if it doesn't exist
   * @param type
   * @private
   */
  private getModifier(type: string): LudiekModifier {
    const modifier = this._modifiers[type];
    if (!modifier) {
      const registeredModifiers = Object.keys(this._modifiers).join(', ');
      throw new ModifierNotFoundError(
        `Cannot modify bonus of type '${type}' because its modifier is not registered. Registered modifiers are: ${registeredModifiers}`,
      );
    }
    return modifier;
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

  /**
   * Do calculations before the features tick
   */
  public preTick(): void {
    // TODO(@Isha): For now this is called by the Game, might switch up when Features are moved to the engine
    this.collectBonuses();
  }
}
