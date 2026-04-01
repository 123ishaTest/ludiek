import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';

export interface LudiekDependencies {
  plugins?: readonly LudiekPlugin[];
  evaluators?: readonly LudiekEvaluator[];
  consumers?: readonly LudiekConsumer[];
  producers?: readonly LudiekProducer[];
  controllers?: readonly LudiekController[];
  modifiers?: readonly LudiekModifier[];
}

export type DependencyEngine<Dependencies extends LudiekDependencies> = LudiekEngine<
  NonNullable<Dependencies['plugins']>,
  NonNullable<Dependencies['evaluators']>,
  NonNullable<Dependencies['consumers']>,
  NonNullable<Dependencies['producers']>,
  NonNullable<Dependencies['controllers']>,
  NonNullable<Dependencies['modifiers']>
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
  public inject<Engine extends DependencyEngine<any>>(engine: Engine): void {
    this._engine = engine;
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
