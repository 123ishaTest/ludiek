import { LudiekFeature } from '@ludiek/engine/LudiekFeature';

export class EmptyFeature extends LudiekFeature<never> {
  readonly name = 'empty';
  public readonly config = {};
  protected _state = {};
}
