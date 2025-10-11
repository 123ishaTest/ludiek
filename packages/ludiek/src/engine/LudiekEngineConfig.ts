import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface LudiekEngineConfig<
  Plugins extends readonly LudiekPlugin[] = [],
  Evaluators extends readonly LudiekEvaluator[] = [],
  Consumers extends readonly LudiekConsumer[] = [],
  Producers extends readonly LudiekProducer[] = [],
  Controllers extends readonly LudiekController[] = [],
  Modifiers extends readonly LudiekModifier[] = [],
> {
  plugins?: Plugins;
  evaluators?: Evaluators;
  consumers?: Consumers;
  producers?: Producers;
  controllers?: Controllers;
  modifiers?: Modifiers;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[] | undefined> = Plugins extends undefined
  ? object
  : {
      [Plugin in NonNullable<Plugins>[number] as Plugin['name']]: Extract<
        NonNullable<Plugins>[number],
        { name: Plugin['name'] }
      >;
    };
