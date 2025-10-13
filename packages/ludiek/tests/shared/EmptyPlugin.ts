import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

/**
 * An empty plugin
 */
export class EmptyPlugin extends LudiekPlugin {
  public readonly name = 'empty';
  protected readonly _state = {};

  public loadContent(): void {}
}
