import { LudiekPlugin } from './LudiekPlugin';

interface LudiekConfig<Plugins extends LudiekPlugin[]> {
  plugins?: Plugins;
}

export type PluginMap<Plugins extends readonly LudiekPlugin[]> = {
  [Plugin in Plugins[number] as Plugin['name']]: Extract<Plugins[number], { name: Plugin['name'] }>;
};

/**
 * Collection of plugins
 */
export class LudiekEngine<Plugins extends LudiekPlugin[]> {
  public plugins: PluginMap<Plugins>;

  constructor(config: LudiekConfig<Plugins>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;
  }
}
