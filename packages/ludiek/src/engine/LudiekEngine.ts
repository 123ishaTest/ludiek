import { LudiekEngineConfig } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { ControllerSchemas, LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekRequest';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';
import {
  BonusContribution,
  LudiekBonus,
  LudiekModifier,
  ModifierSchemas,
} from '@ludiek/engine/modifier/LudiekModifier';
import { ModifierNotFoundError } from '@ludiek/engine/modifier/ModifierError';
import { z, ZodDiscriminatedUnion, ZodNever, ZodType } from 'zod';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

import { ContentMap, FeatureMap, PluginMap } from '@ludiek/util/types';
import { l, LudiekContent } from './LudiekContent';
import { replaceSchema } from '@ludiek/util/schema';
import { ContentManager } from '@123ishatest/louter';
import { LudiekConditionConcept } from '@ludiek/engine/condition/LudiekConditionConcept';
import { LudiekInputConcept } from '@ludiek/engine/input/LudiekInputConcept';
import { LudiekOutputConcept } from '@ludiek/engine/output/LudiekOutputConcept';

export class LudiekEngine<
  const Plugins extends readonly LudiekPlugin[] = [],
  const Features extends readonly LudiekFeature[] = [],
  const Content extends readonly LudiekContent[] = [],
  const Evaluators extends readonly LudiekEvaluator[] = [],
  const Consumers extends readonly LudiekConsumer[] = [],
  const Producers extends readonly LudiekProducer[] = [],
  const Controllers extends readonly LudiekController[] = [],
  const Modifiers extends readonly LudiekModifier[] = [],
> {
  public plugins: PluginMap<Plugins>;
  public features: FeatureMap<Features>;
  public content: ContentMap<Content>;
  private readonly _contentManager: ContentManager<ContentMap<Content>>;
  private readonly _condition: LudiekConditionConcept<Evaluators> = new LudiekConditionConcept(this);
  private readonly _input: LudiekInputConcept<Consumers> = new LudiekInputConcept(this);
  private readonly _output: LudiekOutputConcept<Producers> = new LudiekOutputConcept(this);
  private readonly _controllers: Record<string, LudiekController> = {};
  private readonly _modifiers: Record<string, LudiekModifier> = {};
  private readonly _activeBonuses: Record<string, Record<string, BonusContribution[]>>;

  constructor(
    config: LudiekEngineConfig<Plugins, Features, Content, Evaluators, Consumers, Producers, Controllers, Modifiers>,
    state = {},
  ) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.type, p]) ?? []) as PluginMap<Plugins>;
    config.plugins?.forEach((p) => p.inject(this));

    this.features = Object.fromEntries(config.features?.map((f) => [f.type, f]) ?? []) as FeatureMap<Features>;
    config.features?.forEach((f) => f.inject(this));

    config.evaluators?.forEach((c) => this._condition.register(c));
    config.consumers?.forEach((i) => this._input.register(i));
    config.producers?.forEach((o) => this._output.register(o));
    config.controllers?.forEach((c) => this.registerController(c));
    config.modifiers?.forEach((m) => this.registerModifier(m));

    // Replace schemas
    this.content = Object.fromEntries(
      config.content?.map((c) => [c.kind, this.sanitizeSchema(c.schema)]) ?? [],
    ) as ContentMap<Content>;

    this._contentManager = new ContentManager(this.content);

    this._activeBonuses = state;
  }

  public get controllers(): Controllers {
    return Object.values(this._controllers) as unknown as Controllers;
  }

  public requestSchema(): ZodNever | ZodDiscriminatedUnion<ControllerSchemas<Controllers>, 'type'> {
    const schemas = this.controllers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
  }

  public get modifiers(): Modifiers {
    return Object.values(this._modifiers) as unknown as Modifiers;
  }

  public bonusSchema(): ZodNever | ZodDiscriminatedUnion<ModifierSchemas<Modifiers>, 'type'> {
    const schemas = this.modifiers.map((c) => c.schema);
    return schemas.length === 0 ? z.never() : z.discriminatedUnion('type', schemas as never);
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
   * Replace all placeholder schemas with the engines
   */
  private sanitizeSchema = (schema: ZodType): ZodType => {
    schema = replaceSchema(schema, l.condition(), this._condition.schema);
    schema = replaceSchema(schema, l.input(), this._input.schema);
    schema = replaceSchema(schema, l.output(), this._output.schema);
    schema = replaceSchema(schema, l.request(), this.requestSchema());
    schema = replaceSchema(schema, l.bonus(), this.bonusSchema());

    return schema;
  };

  public get contentManager() {
    return this._contentManager;
  }

  public request(request: LudiekRequest<Controllers>): void {
    const controller = this.getController(request.type);
    controller.resolve(request);
  }

  /**
   * Evaluate one or multiple condition and evaluates whether they are all true.
   */
  public evaluate(condition: LudiekCondition<Evaluators> | LudiekCondition<Evaluators>[]): boolean {
    return this._condition.evaluate(condition);
  }

  /**
   * Modify a condition to apply bonuses
   *
   * Each condition has its own `modify` function, which queries the engine for relevant bonuses
   */
  public modifyCondition<Condition extends LudiekCondition<Evaluators>>(condition: Condition): Condition {
    return this._condition.modify(condition);
  }

  public get condition(): LudiekConditionConcept<Evaluators> {
    return this._condition;
  }

  public canConsume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): boolean {
    return this._input.canConsume(input);
  }

  public consume(input: LudiekInput<Consumers> | LudiekInput<Consumers>[]): void {
    this._input.consume(input);
  }

  public modifyInput<Input extends LudiekInput<Consumers>>(input: Input): Input {
    return this._input.modify(input);
  }

  public get input(): LudiekInputConcept<Consumers> {
    return this._input;
  }

  public canProduce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): boolean {
    return this._output.canProduce(output);
  }

  public produce(output: LudiekOutput<Producers> | LudiekOutput<Producers>[]): void {
    this._output.produce(output);
  }

  public modifyOutput<Output extends LudiekOutput<Producers>>(output: Output): Output {
    return this._output.modify(output);
  }

  public get output(): LudiekOutputConcept<Producers> {
    return this._output;
  }

  public handleTransaction(
    transaction: LudiekTransaction<LudiekInput<Consumers>, LudiekOutput<Producers>, LudiekCondition<Evaluators>>,
  ): boolean {
    if (transaction.requirement && !this._condition.evaluate(transaction.requirement)) {
      return false;
    }

    if (transaction.input && !this._input.canConsume(transaction.input)) {
      return false;
    }

    if (transaction.output && !this._output.canProduce(transaction.output)) {
      return false;
    }

    if (transaction.input) {
      this._input.consume(transaction.input);
    }

    if (transaction.output) {
      this._output.produce(transaction.output);
    }
    return true;
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

  public get activeBonuses(): Record<string, Record<string, BonusContribution[]>> {
    return this._activeBonuses;
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
    const data: LudiekEngineSaveData = {
      features: {},
      plugins: {},
    };

    this.pluginList.forEach((plugin) => {
      data.plugins[plugin.type] = plugin.save();
    });

    this.featureList.forEach((feature) => {
      data.features[feature.type] = feature.save();
    });

    return data;
  }

  public load(data: LudiekEngineSaveData): void {
    this.pluginList.forEach((plugin) => {
      const state = data.plugins[plugin.type];
      if (state) {
        plugin.load(state);
      }
    });
    this.featureList.forEach((feature) => {
      const state = data.features[feature.type];
      if (state) {
        feature.load(state);
      }
    });
  }

  public get pluginList(): LudiekPlugin[] {
    return Object.values(this.plugins);
  }

  public get featureList(): LudiekFeature[] {
    return Object.values(this.features);
  }

  /**
   * Do calculations before the features tick
   */
  public preTick(): void {
    // TODO(@Isha): For now this is called by the Game, might switch up when Features are moved to the engine
    this.collectBonuses();
  }

  public tick(delta: number): void {
    // TODO(@Isha): Should plugins tick too?
    this.featureList.forEach((feature) => feature.update?.(delta));
  }
}
