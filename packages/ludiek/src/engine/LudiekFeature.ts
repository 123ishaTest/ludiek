import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { merge } from 'es-toolkit';
import { LudiekController } from '@ludiek/engine/requests/LudiekRequest';
import { LudiekCondition } from '@ludiek/engine/conditions/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';

export abstract class LudiekFeature<Plugins extends Record<string, LudiekPlugin>> implements LudiekSavable {
  /**
   * Override with the name of your feature
   * @remarks Type it as a literal, not as a string as this breaks type-safety.
   */
  abstract readonly name: string;

  protected abstract _state: object;

  public abstract readonly config: {
    conditions?: LudiekCondition[];
    controllers?: LudiekController[];
    inputs?: LudiekInput[];
    outputs?: LudiekOutput[];
  };

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
