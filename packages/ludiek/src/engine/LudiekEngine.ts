import { LudiekPlugin } from './LudiekPlugin';

interface LudiekConfig<API extends Record<string, LudiekPlugin>> {
  plugins: API;
}

/**
 * Collection of plugins
 */
export class LudiekEngine<API extends Record<string, LudiekPlugin>> {
  public api: API;

  constructor(config: LudiekConfig<API>) {
    this.api = config.plugins;
  }
}
