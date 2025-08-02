import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin {
  abstract readonly name: string;

  protected _engine!: LudiekEngine;

  public setEngine(ludiekEngine: LudiekEngine) {
    this._engine = ludiekEngine;
  }

  // TODO(@Isha): Add persistence
}
