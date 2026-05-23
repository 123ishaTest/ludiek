import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekController';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekModifier } from '@ludiek/engine/bonus/LudiekModifier';
import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekContent } from '@ludiek/engine/LudiekContent';

export interface LudiekEngineConfig<
  Plugins extends readonly LudiekPlugin[] = [],
  Features extends readonly LudiekFeature[] = [],
  Content extends readonly LudiekContent[] = [],
  Evaluators extends readonly LudiekEvaluator[] = [],
  Consumers extends readonly LudiekConsumer[] = [],
  Producers extends readonly LudiekProducer[] = [],
  Controllers extends readonly LudiekController[] = [],
  Modifiers extends readonly LudiekModifier[] = [],
> {
  plugins?: Plugins;
  features?: Features;
  content?: Content;
  evaluators?: Evaluators;
  consumers?: Consumers;
  producers?: Producers;
  controllers?: Controllers;
  modifiers?: Modifiers;

  engineId?: string;
  debug?: boolean;
}
