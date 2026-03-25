import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseCondition, LudiekCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
import { LudiekEngineConfig, PluginMap } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekGame } from '@ludiek/engine/LudiekGame';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

export function createLudiek<
  Config extends LudiekEngineConfig<Plugins, Evaluators, Consumers, Producers, Controllers, Modifiers>,
  Plugins extends readonly LudiekPlugin[] = NonNullable<Config['plugins']>,
  Evaluators extends readonly LudiekEvaluator[] = NonNullable<Config['evaluators']>,
  Consumers extends readonly LudiekConsumer[] = NonNullable<Config['consumers']>,
  Producers extends readonly LudiekProducer[] = NonNullable<Config['producers']>,
  Controllers extends readonly LudiekController[] = NonNullable<Config['controllers']>,
  Modifiers extends readonly LudiekModifier[] = NonNullable<Config['modifiers']>,
>() {
  /**
   * Feature
   */
  type FeatureConstructor = abstract new () => LudiekFeature<PluginMap<Plugins>>;
  const Feature = LudiekFeature as FeatureConstructor;

  /**
   * Engine concepts
   */
  abstract class Producer<Output extends BaseOutput> extends LudiekProducer<Output, Config> {}

  type ConsumerConstructor = abstract new <Input extends BaseInput>() => LudiekConsumer<Input, Config>;
  const Consumer = LudiekConsumer as ConsumerConstructor;

  type EvaluatorConstructor = abstract new <Condition extends BaseCondition>() => LudiekEvaluator<Condition, Config>;
  const Evaluator = LudiekEvaluator as EvaluatorConstructor;

  type ControllerConstructor = abstract new <Request extends BaseRequest>() => LudiekController<Request, Config>;
  const Controller = LudiekController as ControllerConstructor;

  type ModifierConstructor = abstract new <Bonus extends BaseBonus>() => LudiekModifier<Bonus, Config>;
  const Modifier = LudiekModifier as ModifierConstructor;

  function createEngine(config: Config, state = {}) {
    return new LudiekEngine(config, state);
  }

  function createGame<Features extends LudiekFeature<PluginMap<Plugins>>[]>(
    engine: LudiekEngine<Plugins, Evaluators, Consumers, Producers, Controllers, Modifiers>,
    config: LudiekGameConfig<Plugins, Features>,
  ) {
    return new LudiekGame(engine, config);
  }

  type C = LudiekCondition<Evaluators>;

  return {
    Feature,

    Evaluator,
    Consumer,
    Producer,
    Controller,
    Modifier,
    Condition: (): C => { return {}},


    createEngine,
    createGame,
  };
}
