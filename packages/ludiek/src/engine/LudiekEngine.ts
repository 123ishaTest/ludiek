import { LudiekConfig, PluginMap } from '@ludiek/engine/LudiekConfiguration';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

/**
 * Collection of plugins
 */
export class LudiekEngine<Plugins extends LudiekPlugin[]> {
  public plugins: PluginMap<Plugins>;

  constructor(config: LudiekConfig<Plugins>) {
    this.plugins = Object.fromEntries(config.plugins?.map((p) => [p.name, p]) ?? []) as PluginMap<Plugins>;
  }
}
