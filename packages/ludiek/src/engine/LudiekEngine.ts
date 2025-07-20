import { LudiekPlugin } from './LudiekPlugin';

/**
 * Collection of plugins
 */
export class LudiekEngine<API extends Record<string, LudiekPlugin>> {
  public api: API;

  constructor(plugins: API) {
    this.api = plugins;
  }
}
