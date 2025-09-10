import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekCondition } from '@ludiek/engine/condition/LudiekCondition';
import { LudiekInput } from '@ludiek/engine/input/LudiekInput';
import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

export abstract class LudiekEngineConcept {
  abstract readonly type: string;

  private _engine!: LudiekEngine<LudiekPlugin[], LudiekCondition[], LudiekInput[], LudiekOutput[], LudiekController[]>;

  /**
   * @internal used by the engine to inject itself
   */
  public inject(
    engine: LudiekEngine<LudiekPlugin[], LudiekCondition[], LudiekInput[], LudiekOutput[], LudiekController[]>,
  ) {
    this._engine = engine as LudiekEngine<
      LudiekPlugin[],
      LudiekCondition[],
      LudiekInput[],
      LudiekOutput[],
      LudiekController[]
    >;
  }
}
