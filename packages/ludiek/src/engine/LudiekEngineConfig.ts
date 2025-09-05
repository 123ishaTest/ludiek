import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

export interface LudiekEngineConfig<
  Plugins extends LudiekPlugin[] | undefined = undefined,
  Conditions extends LudiekCondition[] | undefined = undefined,
  Inputs extends LudiekInput[] | undefined = undefined,
  Outputs extends LudiekOutput[] | undefined = undefined,
  Controllers extends LudiekController[] | undefined = undefined,
> {
  plugins?: Plugins;
  conditions?: Conditions;
  inputs?: Inputs;
  outputs?: Outputs;
  controllers?: Controllers;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[] | undefined> = Plugins extends undefined
  ? object
  : {
      [Plugin in NonNullable<Plugins>[number] as Plugin['name']]: Extract<
        NonNullable<Plugins>[number],
        { name: Plugin['name'] }
      >;
    };
