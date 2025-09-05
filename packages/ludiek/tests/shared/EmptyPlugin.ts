import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

/**
 * A barebones plugin.
 */
export class EmptyPlugin extends LudiekPlugin {
  readonly name = 'empty';
  public readonly config = {};

  protected _state = {};

  public loadContent(): void {
    throw new Error('Method not implemented.');
  }
}
