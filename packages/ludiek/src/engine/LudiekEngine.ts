import { LudiekPlugin } from './LudiekPlugin';

export type LudiekAPI<PL extends readonly LudiekPlugin[]> = {
  [P in PL[number] as P['name']]: P;
};

/**
 * Collection of plugins
 */
export class LudiekEngine<PL extends readonly LudiekPlugin[]> {
  public api: LudiekAPI<PL>;

  constructor(plugins: PL) {
    // Create plugin API
    const api = {} as any;
    plugins.forEach((plugin) => {
      api[plugin.name] = plugin;
    });
    this.api = api;
  }
}
