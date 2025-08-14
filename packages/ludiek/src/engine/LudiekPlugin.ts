import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { BaseConditionShape } from '@ludiek/engine/LudiekCondition';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin {
  abstract readonly name: string;
  protected abstract _state: object;

  private _engine!: LudiekEngine<never, never>;

  inject(engine: LudiekEngine<never, never>) {
    this._engine = engine;
  }

  public abstract loadContent(content: { id: string }[]): void;

  /**
   * @internal
   * @see LudiekEngine.evaluate
   */
  protected evaluate(condition: BaseConditionShape | BaseConditionShape[]): boolean {
    if (!this._engine) {
      throw new EngineNotInjectedError(`There is no engine injected into plugin '${this.name}'`);
    }
    return this._engine.evaluate(condition);
  }

  // TODO(@Isha): Add persistence
  public save(): object {
    return this._state;
  }

  public load(data: object): void {
    this._state = data;
  }
}
