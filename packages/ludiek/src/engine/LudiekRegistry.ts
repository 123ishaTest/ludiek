import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { DependencyEngine } from '@ludiek/engine/LudiekEngineConcept';
import { BaseBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
import { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';

// 1. The engine exports a registry interface:
//  you can use it to register concepts globally
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LudiekRegistry {}

// 3. But for your game, we will wire in the registry
export abstract class CustomEvaluator<Condition extends BaseCondition> extends LudiekEvaluator<
  Condition,
  LudiekRegistry
> {}

export abstract class CustomConsumer<Input extends BaseInput> extends LudiekConsumer<Input, LudiekRegistry> {}

export abstract class CustomProducer<Output extends BaseOutput> extends LudiekProducer<Output, LudiekRegistry> {}

export abstract class CustomController<Request extends BaseRequest> extends LudiekController<Request, LudiekRegistry> {}

export abstract class CustomModifier<Bonus extends BaseBonus> extends LudiekModifier<Bonus, LudiekRegistry> {}

// 4. And a custom create engine, so you cannot accidentally lie about plugins existing
export const createEngine = (config: LudiekRegistry, state = {}): DependencyEngine<LudiekRegistry> => {
  return new LudiekEngine(config, state);
};
