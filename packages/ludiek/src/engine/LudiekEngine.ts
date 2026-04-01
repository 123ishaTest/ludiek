import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EvaluatorSchemas, LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { ConsumerSchemas, LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekOutput, LudiekProducer, ProducerSchemas } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { ControllerSchemas, LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekRequest';
import { ConditionNotFoundError } from '@ludiek/engine/condition/ConditionError';
import { InputNotFoundError } from '@ludiek/engine/input/InputError';
import { OutputNotFoundError } from '@ludiek/engine/output/OutputError';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';
import {
  BonusContribution,
  LudiekBonus,
  LudiekModifier,
  ModifierSchemas,
} from '@ludiek/engine/modifier/LudiekModifier';
import { ModifierNotFoundError } from '@ludiek/engine/modifier/ModifierError';
import { cloneDeep } from 'es-toolkit';
import { z, ZodDiscriminatedUnion, ZodNever } from 'zod';

export type EngineTypes<C extends LudiekEngineConfig> = {
  Plugins: NonNullable<C['plugins']>;
  Evaluators: NonNullable<C['evaluators']>;
  Consumers: NonNullable<C['consumers']>;
  Producers: NonNullable<C['producers']>;
  Controllers: NonNullable<C['controllers']>;
  Modifiers: NonNullable<C['modifiers']>;
};

export class LudiekEngine<C extends LudiekEngineConfig> {
  public plugins: PluginMap<EngineTypes<C>['Plugins']>;
  private readonly _evaluators: Record<string, LudiekEvaluator> = {};
  private readonly _consumers: Record<string, LudiekConsumer> = {};
  private readonly _producers: Record<string, LudiekProducer> = {};
  private readonly _controllers: Record<string, LudiekController> = {};
  private readonly _modifiers: Record<string, LudiekModifier> = {};
  private readonly _activeBonuses: Record<string, Record<string, BonusContribution[]>>;

  constructor(config: C, state = {}) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.type, p]) ?? []) as PluginMap<C['plugins']>;
    config.plugins?.forEach((p) => p.inject(this));

    config.evaluators?.forEach((c) => this.registerEvaluator(c));
    config.consumers?.forEach((i) => this.registerConsumer(i));
    config.producers?.forEach((o) => this.registerProducer(o));
    config.controllers?.forEach((c) => this.registerController(c));
    config.modifiers?.forEach((m) => this.registerModifier(m));

    this._activeBonuses = state;
  }

  public get evaluators(): EngineTypes<C>['Evaluators'] {
    return Object.values(this._evaluators) as EngineTypes<C>['Evaluators'];
  }

  public conditionSchema(): ZodNever | ZodDiscriminatedUnion<EvaluatorSchemas<EngineTypes<C>['Evaluators']>, 'type'> {
    const schemas = this.evaluators.map((e) => e.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }

  public get consumers(): EngineTypes<C>['Consumers'] {
    return Object.values(this._consumers) as EngineTypes<C>['Consumers'];
  }

  public inputSchema(): ZodNever | ZodDiscriminatedUnion<ConsumerSchemas<EngineTypes<C>['Consumers']>, 'type'> {
    const schemas = this.consumers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }

  public get producers(): EngineTypes<C>['Producers'] {
    return Object.values(this._producers) as EngineTypes<C>['Producers'];
  }

  public outputSchema(): ZodNever | ZodDiscriminatedUnion<ProducerSchemas<EngineTypes<C>['Producers']>, 'type'> {
    const schemas = this.producers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }

  public get controllers(): EngineTypes<C>['Controllers'] {
    return Object.values(this._controllers) as unknown as EngineTypes<C>['Controllers'];
  }

  public requestSchema(): ZodNever | ZodDiscriminatedUnion<ControllerSchemas<EngineTypes<C>['Controllers']>, 'type'> {
    const schemas = this.controllers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }

  public get modifiers(): EngineTypes<C>['Modifiers'] {
    return Object.values(this._modifiers) as unknown as EngineTypes<C>['Modifiers'];
  }

  public bonusSchema(): ZodNever | ZodDiscriminatedUnion<ModifierSchemas<EngineTypes<C>['Modifiers']>, 'type'> {
    const schemas = this.modifiers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
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
  public evaluate(
    condition: LudiekCondition<EngineTypes<C>['Evaluators']> | LudiekCondition<EngineTypes<C>['Evaluators']>[],
  ): boolean {
    if (!Array.isArray(condition)) {
      condition = [condition];
    }

    return condition.every((condition) => {
      const evaluator = this.getEvaluator(condition.type);
      const modified = evaluator.modify(cloneDeep(condition));
      return evaluator.evaluate(modified);
    });
  }

  public request(request: LudiekRequest<EngineTypes<C>['Controllers']>): void {
    const controller = this.getController(request.type);
    controller.resolve(request);
  }

  public handleTransaction(
    transaction: LudiekTransaction<
      LudiekInput<EngineTypes<C>['Consumers']>,
      LudiekOutput<EngineTypes<C>['Producers']>,
      LudiekCondition<EngineTypes<C>['Evaluators']>
    >,
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
  public canConsume(
    input: LudiekInput<EngineTypes<C>['Consumers']> | LudiekInput<EngineTypes<C>['Consumers']>[],
  ): boolean {
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
  public consume(input: LudiekInput<EngineTypes<C>['Consumers']> | LudiekInput<EngineTypes<C>['Consumers']>[]): void {
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
  public canProduce(
    output: LudiekOutput<EngineTypes<C>['Producers']> | LudiekOutput<EngineTypes<C>['Producers']>[],
  ): boolean {
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
  public produce(
    output: LudiekOutput<EngineTypes<C>['Producers']> | LudiekOutput<EngineTypes<C>['Producers']>[],
  ): void {
    if (!Array.isArray(output)) {
      output = [output];
    }

    output.forEach((o) => {
      const producer = this.getProducer(o.type);
      const modified = producer.modify(cloneDeep(o));
      producer.produce(modified);
    });
  }

  public getBonus(bonus: LudiekBonus<EngineTypes<C>['Modifiers']>): number {
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
      this._activeBonuses[plugin.type] = {};

      const bonuses = plugin.getBonuses?.();

      bonuses?.forEach((bonus) => {
        const modifier = this.getModifier(bonus.type);
        const identifier = modifier.stringify(bonus);
        if (this._activeBonuses[plugin.type][identifier]) {
          this._activeBonuses[plugin.type][identifier].push(bonus);
        } else {
          this._activeBonuses[plugin.type][identifier] = [bonus];
        }
      });
    });
  }

  public modifyCondition<Condition extends LudiekCondition<EngineTypes<C>['Evaluators']>>(
    condition: Condition,
  ): Condition {
    const evaluator = this.getEvaluator(condition.type);
    return evaluator.modify(cloneDeep(condition)) as Condition;
  }

  public modifyInput<Input extends LudiekInput<EngineTypes<C>['Consumers']>>(input: Input): Input {
    const consumer = this.getConsumer(input.type);
    return consumer.modify(cloneDeep(input)) as Input;
  }

  public modifyOutput<Output extends LudiekOutput<EngineTypes<C>['Producers']>>(output: Output): Output {
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
      data[plugin.type] = plugin.save();
    });

    return data;
  }

  public load(data: LudiekEngineSaveData): void {
    this.pluginList.forEach((plugin) => {
      const state = data[plugin.type];
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
