import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

/**
 * An empty plugin
 */
export class EmptyPlugin extends LudiekPlugin {
  public readonly type = 'empty';
  protected readonly _state = {};

  public loadContent(): void {}
}
