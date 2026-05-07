import { LudiekEngineConfig } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekEngineSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekConsumer, LudiekInput } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekController';
import { BonusContribution, LudiekBonus, LudiekModifier } from '@ludiek/engine/bonus/LudiekModifier';
import { ZodType } from 'zod';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

import { ContentMap, FeatureMap, PluginMap } from '@ludiek/util/types';
import { l, LudiekContent } from '@ludiek/engine/LudiekContent';
import { replaceSchema } from '@ludiek/util/schema';
import { ContentManager } from '@123ishatest/louter';
import { LudiekConditionConcept } from '@ludiek/engine/condition/LudiekConditionConcept';
import { LudiekInputConcept } from '@ludiek/engine/input/LudiekInputConcept';
import { LudiekOutputConcept } from '@ludiek/engine/output/LudiekOutputConcept';
import { LudiekRequestConcept } from '@ludiek/engine/request/LudiekRequestConcept';
import { LudiekBonusConcept } from '@ludiek/engine/bonus/LudiekBonusConcept';

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
  private readonly _condition: LudiekConditionConcept<Evaluators>;
  private readonly _input: LudiekInputConcept<Consumers>;
  private readonly _output: LudiekOutputConcept<Producers>;
  private readonly _request: LudiekRequestConcept<Controllers>;
  private readonly _bonus: LudiekBonusConcept<Modifiers>;

  constructor(
    config: LudiekEngineConfig<Plugins, Features, Content, Evaluators, Consumers, Producers, Controllers, Modifiers>,
    state = {},
  ) {
    this._condition = new LudiekConditionConcept(this);
    this._input = new LudiekInputConcept(this);
    this._output = new LudiekOutputConcept(this);
    this._request = new LudiekRequestConcept(this);
    this._bonus = new LudiekBonusConcept(this, state);

    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.type, p]) ?? []) as PluginMap<Plugins>;
    config.plugins?.forEach((p) => p.inject(this));

    this.features = Object.fromEntries(config.features?.map((f) => [f.type, f]) ?? []) as FeatureMap<Features>;
    config.features?.forEach((f) => f.inject(this));

    // TODO(@Isha): Inject in constructor?
    config.evaluators?.forEach((c) => this._condition.register(c));
    config.consumers?.forEach((i) => this._input.register(i));
    config.producers?.forEach((o) => this._output.register(o));
    config.controllers?.forEach((c) => this._request.register(c));
    config.modifiers?.forEach((m) => this._bonus.register(m));

    // Replace schemas
    this.content = Object.fromEntries(
      config.content?.map((c) => [c.kind, this.sanitizeSchema(c.schema)]) ?? [],
    ) as ContentMap<Content>;

    this._contentManager = new ContentManager(this.content);
  }

  /**
   * Replace all placeholder schemas with the engines
   */
  private sanitizeSchema = (schema: ZodType): ZodType => {
    schema = replaceSchema(schema, l.condition(), this._condition.schema);
    schema = replaceSchema(schema, l.input(), this._input.schema);
    schema = replaceSchema(schema, l.output(), this._output.schema);
    schema = replaceSchema(schema, l.request(), this._request.schema);
    schema = replaceSchema(schema, l.bonus(), this._bonus.schema);

    return schema;
  };

  public get contentManager() {
    return this._contentManager;
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

  public resolveRequest(request: LudiekRequest<Controllers>): void {
    return this._request.resolve(request);
  }

  public get request(): LudiekRequestConcept<Controllers> {
    return this._request;
  }

  public getBonus(bonus: LudiekBonus<Modifiers>): number {
    return this._bonus.getBonus(bonus);
  }

  public get activeBonuses(): Record<string, Record<string, BonusContribution[]>> {
    return this._bonus.activeBonuses;
  }

  public get bonus(): LudiekBonusConcept<Modifiers> {
    return this._bonus;
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
    this._bonus.collectBonuses();
  }

  public tick(delta: number): void {
    // TODO(@Isha): Should plugins tick too?
    this.featureList.forEach((feature) => feature.update?.(delta));
  }
}
