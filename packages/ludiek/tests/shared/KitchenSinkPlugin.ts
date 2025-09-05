import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { KitchenSinkController } from '@tests/shared/KitchenSinkController';
import { KitchenSinkCondition } from '@tests/shared/KitchenSinkCondition';
import { KitchenSinkInput } from '@tests/shared/KitchenSinkInput';
import { KitchenSinkOutput } from '@tests/shared/KitchenSinkOutput';

/**
 * A complicated plugin containing one of each engine concept.
 */
export class KitchenSinkPlugin extends LudiekPlugin {
  readonly name = 'sink';
  public readonly config = {
    conditions: [new KitchenSinkCondition(this)],
    controllers: [new KitchenSinkController(this)],
    inputs: [new KitchenSinkInput(this)],
    outputs: [new KitchenSinkOutput(this)],
  };

  protected _state = {
    variable: 0,
  };

  public loadContent(): void {
    throw new Error('Method not implemented.');
  }

  public get variable(): number {
    return this._state.variable;
  }

  increase(amount: number) {
    this._state.variable += amount;
  }
}
