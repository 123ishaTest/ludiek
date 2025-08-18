import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { merge } from 'es-toolkit';

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

  public get state(): object {
    return this._state;
  }

  public save(): object {
    return this._state;
  }

  public load(data: object): void {
    merge(this._state, data);
  }
}
