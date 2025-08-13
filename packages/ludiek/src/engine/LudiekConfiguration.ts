import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';

export interface LudiekConfig<
  Plugins extends LudiekPlugin[],
  Conditions extends LudiekCondition<BaseConditionShape>[],
> {
  plugins?: Plugins;
  conditions?: Conditions;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[]> = {
  [Plugin in Plugins[number] as Plugin['name']]: Extract<Plugins[number], { name: Plugin['name'] }>;
};
