import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';

export interface LudiekConfig<
  Plugins extends readonly LudiekPlugin[],
  Conditions extends readonly LudiekCondition[],
  Inputs extends readonly LudiekInput[],
  Outputs extends readonly LudiekOutput[],
> {
  plugins?: Plugins;
  conditions?: Conditions;
  inputs?: Inputs;
  outputs?: Outputs;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[]> = {
  [Plugin in Plugins[number] as Plugin['name']]: Extract<Plugins[number], { name: Plugin['name'] }>;
};
