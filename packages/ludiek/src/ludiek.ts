import { LudiekEngineConfig } from '@ludiek/engine/LudiekEngineConfig';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { DependencyEngine } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createLudiek = <Config extends LudiekEngineConfig<any, any, any, any, any, any>>() => {
  function feature() {
    return LudiekFeature<Config>;
  }

  function evaluator<Condition extends BaseCondition>() {
    return LudiekEvaluator<Condition, Config>;
  }
  function consumer<Input extends BaseInput>() {
    return LudiekConsumer<Input, Config>;
  }
  function producer<Output extends BaseOutput>() {
    return LudiekProducer<Output, Config>;
  }
  function controller<Request extends BaseRequest>() {
    return LudiekController<Request, Config>;
  }
  function modifier<Bonus extends BaseBonus>() {
    return LudiekModifier<Bonus, Config>;
  }

  function createEngine(config: Config, state = {}): DependencyEngine<Config> {
    return new LudiekEngine(config, state);
  }

  return {
    createEngine,

    feature,
    evaluator,
    consumer,
    producer,
    controller,
    modifier,
  };
};
