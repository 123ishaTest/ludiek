import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { BaseConditionShape } from '@ludiek/engine/LudiekCondition';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin {
  abstract readonly name: string;

  private _engine!: LudiekEngine<never, never>;

  inject(engine: LudiekEngine<never, never>) {
    this._engine = engine;
  }

  /**
   * @internal
   * @see LudiekEngine.evaluate
   */
  protected evaluate(condition: BaseConditionShape | BaseConditionShape[]): boolean {
    if (Array.isArray(condition)) {
      return condition.every((c) => this._engine.evaluate(c));
    }
    return this._engine.evaluate(condition);
  }

  // TODO(@Isha): Add persistence
}
