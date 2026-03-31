import { merge } from 'es-toolkit';
import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';
import { LudiekDependencies, LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

/**
 * A shared base class for plugins and features
 */
export abstract class LudiekElement<Dependencies extends LudiekDependencies>
  extends LudiekEngineConcept<Dependencies>
  implements LudiekSavable
{
  /**
   * Override with the name of your feature
   * @remarks Type it as a literal, not as a string as this breaks type-safety.
   */
  abstract readonly type: string;

  protected abstract _state: object;

  /**
   *  Return a list of bonuses
   */
  public getBonuses(): BonusContribution[] {
    return [];
  }

  /**
   * @internal
   * @see LudiekEngine.evaluate
   */
  protected evaluate(...args: Parameters<(typeof this.engine)['evaluate']>) {
    this.ensureEngine();
    return this.engine.evaluate(...args);
  }

  /**
   * @internal
   * @see LudiekEngine.handleTransaction
   */
  protected handleTransaction(...args: Parameters<(typeof this.engine)['handleTransaction']>) {
    this.ensureEngine();
    return this.engine.handleTransaction(...args);
  }

  /**
   * @internal
   * @see LudiekEngine.canConsume
   */
  protected canConsume(...args: Parameters<(typeof this.engine)['canConsume']>) {
    this.ensureEngine();
    return this.engine.canConsume(...args);
  }

  /**
   * @internal
   * @see LudiekEngine.consume
   */
  protected consume(...args: Parameters<(typeof this.engine)['consume']>) {
    this.ensureEngine();
    this.engine.consume(...args);
  }

  /**
   * @internal
   * @see LudiekEngine.canProduce
   */
  protected canProduce(...args: Parameters<(typeof this.engine)['canProduce']>) {
    this.ensureEngine();
    return this.engine.canProduce(...args);
  }

  /**
   * @internal
   * @see LudiekEngine.produce
   */
  protected produce(...args: Parameters<(typeof this.engine)['produce']>) {
    this.ensureEngine();
    return this.engine.produce(...args);
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
