// import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
// import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
// import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
// import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
// import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
// import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
// import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

/**
 * An empty object that can be augmented by the consumer
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface LudiekRegistry {
  // plugins: LudiekPlugin[];
  // features: LudiekFeature[];
  // evaluators: LudiekEvaluator[];
  // consumers: LudiekConsumer[];
  // producers: LudiekProducer[];
  // controllers: LudiekController[];
  // modifiers: LudiekModifier[];
}

export type MaybeKey<T, K extends PropertyKey> = K extends keyof T ? T[K] : never;
export type IfNever<T, Default> = [T] extends [never] ? Default : T;
