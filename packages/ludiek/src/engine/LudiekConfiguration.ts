import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export interface LudiekConfig<Plugins extends LudiekPlugin[]> {
  plugins?: Plugins;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[]> = {
  [Plugin in Plugins[number] as Plugin['name']]: Extract<Plugins[number], { name: Plugin['name'] }>;
};
