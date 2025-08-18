import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { BaseConditionShape } from '@ludiek/engine/LudiekCondition';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';

import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { merge } from 'es-toolkit';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin implements LudiekSavable {
  abstract readonly name: string;
  protected abstract _state: object;

  private _engine!: LudiekEngine<never, never, never, never>;

  inject(engine: LudiekEngine<never, never, never, never>) {
    this._engine = engine;
  }

  public abstract loadContent(content: { id: string }[]): void;

  /**
   * @internal
   * @see LudiekEngine.evaluate
   */
  protected evaluate(condition: BaseConditionShape | BaseConditionShape[]): boolean {
    this.ensureEngine();
    return this._engine.evaluate(condition);
  }

  // /**
  //  * @internal
  //  * @see LudiekEngine.loseInput
  //  */
  // protected loseInput(condition: BaseConditionShape | BaseConditionShape[]): boolean {
  //   this.ensureEngine()
  //   return this._engine.loseInput(condition);
  // }

  /**
   * Throws an error if the engine is not injected
   * @private
   */
  private ensureEngine(): void {
    if (!this._engine) {
      throw new EngineNotInjectedError(`There is no engine injected into plugin '${this.name}'`);
    }
  }

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
