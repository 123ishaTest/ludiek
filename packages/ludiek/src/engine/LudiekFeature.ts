import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

export abstract class LudiekFeature<Plugins extends Record<string, LudiekPlugin>> {
  abstract readonly name: string;

  protected _plugins!: Plugins;

  public init(api: Plugins) {
    this._plugins = api;
  }

  /**
   * Called every tick
   * @param delta how much time has passed in seconds
   */
  update?(delta: number): void;

  // TODO(@Isha): Add persistence
}
