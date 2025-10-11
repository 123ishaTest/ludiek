import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekSavable } from '@ludiek/engine/peristence/LudiekSavable';
import { LudiekTransaction } from '@ludiek/engine/transaction/LudiekTransaction';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { merge } from 'es-toolkit';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

/**
 * A shared base class for plugins and features
 */
export abstract class LudiekElement implements LudiekSavable {
  /**
   * Override with the name of your feature
   * @remarks Type it as a literal, not as a string as this breaks type-safety.
   */
  abstract readonly name: string;

  protected abstract _state: object;

  protected _engine!: LudiekEngine<
    LudiekPlugin[],
    LudiekEvaluator[],
    LudiekConsumer[],
    LudiekProducer[],
    LudiekController[]
  >;

  inject<Engine>(engine: Engine) {
    this._engine = engine as LudiekEngine<
      LudiekPlugin[],
      LudiekEvaluator[],
      LudiekConsumer[],
      LudiekProducer[],
      LudiekController[]
    >;
  }

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
  protected evaluate(condition: BaseCondition | BaseCondition[]): boolean {
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
   * @see LudiekEngine.canConsume
   */
  protected canConsume(input: BaseInput | BaseInput[]): boolean {
    this.ensureEngine();
    return this._engine.canConsume(input);
  }

  /**
   * @internal
   * @see LudiekEngine.consume
   */
  protected consume(input: BaseInput | BaseInput[]): void {
    this.ensureEngine();
    this._engine.consume(input);
  }

  /**
   * @internal
   * @see LudiekEngine.canProduce
   */
  protected canProduce(output: BaseOutput | BaseOutput[]): boolean {
    this.ensureEngine();
    return this._engine.canProduce(output);
  }

  /**
   * @internal
   * @see LudiekEngine.produce
   */
  protected produce(output: BaseOutput | BaseOutput[]) {
    this.ensureEngine();
    this._engine.produce(output);
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
