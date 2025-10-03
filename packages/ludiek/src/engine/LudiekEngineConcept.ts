import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

export interface LudiekDependencies {
  plugins?: readonly LudiekPlugin[];
  conditions?: readonly LudiekEvaluator[];
  inputs?: readonly LudiekConsumer[];
  outputs?: readonly LudiekProducer[];
  controllers?: readonly LudiekController[];
}

type DependencyEngine<Dependencies extends LudiekDependencies> = LudiekEngine<
  NonNullable<Dependencies['plugins']>,
  NonNullable<Dependencies['conditions']>,
  NonNullable<Dependencies['inputs']>,
  NonNullable<Dependencies['outputs']>,
  NonNullable<Dependencies['controllers']>
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

  public inject(engine: DependencyEngine<Dependencies>) {
    this._engine = engine;
  }

  /**
   * Throws an error if the engine is not injected
   * @private
   */
  private ensureEngine(): void {
    if (!this._engine) {
      throw new EngineNotInjectedError(`There is no engine injected into concept '${this.type}'`);
    }
  }
}
