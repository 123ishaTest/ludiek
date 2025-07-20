import { LudiekFeature } from '@123ishatest/ludiek';
import type { EngineAPI } from '../../routes/demo';

export class Farming extends LudiekFeature<EngineAPI> {
  public readonly name: string = 'farming';

  constructor() {
    super();
  }

  public plant(): void {
    this._api.currency.gainCurrency('/currency/gems', 4);
  }
}
