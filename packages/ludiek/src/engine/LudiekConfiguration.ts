import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';
import { LudiekController } from '@ludiek/engine/requests/LudiekRequest';

export interface LudiekConfig<
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
