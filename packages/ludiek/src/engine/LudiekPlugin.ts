import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { BaseConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';

import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { merge } from 'es-toolkit';
import { LudiekTransaction } from '@ludiek/engine/transactions/LudiekTransaction';
import { BaseInputShape, LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/transactions/LudiekOutput';
import { LudiekController } from '@ludiek/engine/requests/LudiekRequest';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin implements LudiekSavable {
  /**
   * Override with the name of your feature
   * @remarks Type it as a literal, not as a string as this breaks type-safety.
   */
  abstract readonly name: string;

  // TODO(@Isha): Improve by allowing optionals
  public abstract readonly config: {
    conditions: LudiekCondition[];
    controllers: LudiekController[];
    inputs: LudiekInput[];
    outputs: LudiekOutput[];
  };

  protected abstract _state: object;

  public abstract controllers: LudiekController[];

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

  /**
   * @internal
   * @see LudiekEngine.handleTransaction
   */
  protected handleTransaction(transaction: LudiekTransaction<never, never, never>): boolean {
    this.ensureEngine();
    return this._engine.handleTransaction(transaction);
  }

  /**
   * @internal
   * @see LudiekEngine.canLoseInput
   */
  protected canLoseInput(input: BaseInputShape | BaseInputShape[]): boolean {
    return this._engine.canLoseInput(input);
  }

  /**
   * @internal
   * @see LudiekEngine.loseInput
   */
  protected loseInput(input: BaseInputShape | BaseInputShape[]): void {
    this._engine.loseInput(input);
  }

  /**
   * @internal
   * @see LudiekEngine.canGainOutput
   */
  protected canGainOutput(output: BaseOutputShape | BaseOutputShape[]): boolean {
    return this._engine.canGainOutput(output);
  }

  /**
   * @internal
   * @see LudiekEngine.gainOutput
   */
  protected gainOutput(output: BaseOutputShape | BaseOutputShape[]) {
    this._engine.gainOutput(output);
  }

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
