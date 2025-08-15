import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';

export abstract class LudiekFeature<Plugins extends Record<string, LudiekPlugin>> implements LudiekSavable {
  abstract readonly name: string;

  protected abstract _state: object;

  protected _plugins!: Plugins;

  public init(plugins: Plugins) {
    this._plugins = plugins;
  }

  /**
   * Called every tick
   * @param delta how much time has passed in seconds
   */
  update?(delta: number): void;

  public save(): object {
    return this._state;
  }

  public load(data: object): void {
    Object.assign(this._state, data);
  }
}
