import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
import { LudiekEngineConfig } from '@ludiek/engine/LudiekEngineConfig';

export interface LudiekDependencies {
  plugins?: readonly LudiekPlugin[];
  evaluators?: readonly LudiekEvaluator[];
  consumers?: readonly LudiekConsumer[];
  producers?: readonly LudiekProducer[];
  controllers?: readonly LudiekController[];
  modifiers?: readonly LudiekModifier[];
}

export type DependencyEngine<Dependencies extends LudiekDependencies> = LudiekEngine<
  LudiekEngineConfig<
    NonNullable<Dependencies['plugins']>,
    NonNullable<Dependencies['evaluators']>,
    NonNullable<Dependencies['consumers']>,
    NonNullable<Dependencies['producers']>,
    NonNullable<Dependencies['controllers']>,
    NonNullable<Dependencies['modifiers']>
  >
>;

export abstract class LudiekEngineConcept<Dependencies extends LudiekDependencies = object> {
  abstract readonly type: string;

  private _engine!: DependencyEngine<Dependencies>;

  /**
   * Access to the engine once injected
   */
  protected get engine(): DependencyEngine<Dependencies> {
    this.ensureEngine();
    return this._engine;
  }

  // TODO(@Isha): Fix
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public inject(engine: LudiekEngine<any>): void {
    this._engine = engine as DependencyEngine<Dependencies>;
  }

  protected getBonus(modifier: LudiekBonus<NonNullable<Dependencies['modifiers']>>): number {
    return this.engine.getBonus(modifier);
  }

  /**
   * Throws an error if the engine is not injected
   * @private
   */
  protected ensureEngine(): void {
    if (!this._engine) {
      throw new EngineNotInjectedError(`There is no engine injected into concept '${this.type}'`);
    }
  }
}
