import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { EngineNotInjectedError } from '@ludiek/engine/LudiekError';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';
import { LudiekBonus, LudiekModifier } from '@ludiek/engine/modifier/LudiekModifier';
import { IfNever, LudiekRegistry, MaybeKey } from '@ludiek/engine/LudiekRegistry';

export interface LudiekDependencies {
  plugins: IfNever<MaybeKey<LudiekRegistry, 'plugins'>, readonly LudiekPlugin[]>;
  // features: IfNever<MaybeKey<LudiekRegistry, 'features'>, readonly LudiekFeature<any>[]>;
  evaluators: IfNever<MaybeKey<LudiekRegistry, 'evaluators'>, readonly LudiekEvaluator[]>;
  consumers: IfNever<MaybeKey<LudiekRegistry, 'consumers'>, readonly LudiekConsumer[]>;
  producers: IfNever<MaybeKey<LudiekRegistry, 'producers'>, readonly LudiekProducer[]>;
  controllers: IfNever<MaybeKey<LudiekRegistry, 'controllers'>, readonly LudiekController[]>;
  modifiers: IfNever<MaybeKey<LudiekRegistry, 'modifiers'>, readonly LudiekModifier[]>;
}

export interface LudiekDeps {
  plugins: readonly LudiekPlugin[];
  evaluators: readonly LudiekEvaluator[];
  consumers: readonly LudiekConsumer[];
  producers: readonly LudiekProducer[];
  controllers: readonly LudiekController[];
  modifiers: readonly LudiekModifier[];
}

export type DependencyEngine<Dependencies extends Partial<LudiekDeps>> = LudiekEngine<
  NonNullable<Dependencies['plugins']>,
  NonNullable<Dependencies['evaluators']>,
  NonNullable<Dependencies['consumers']>,
  NonNullable<Dependencies['producers']>,
  NonNullable<Dependencies['controllers']>,
  NonNullable<Dependencies['modifiers']>
>;

export abstract class LudiekEngineConcept<Dependencies extends Partial<LudiekDeps>> {
  abstract readonly type: string;

  private _engine!: DependencyEngine<Dependencies>;

  /**
   * Access to the engine once injected
   */
  protected get engine(): DependencyEngine<Dependencies> {
    this.ensureEngine();
    return this._engine;
  }

  public inject(engine: DependencyEngine<Dependencies>): void {
    this._engine = engine;
  }

  protected getBonus(modifier: LudiekBonus<NonNullable<Dependencies['modifiers']>>): number {
    return this.engine.getBonus(modifier);
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
