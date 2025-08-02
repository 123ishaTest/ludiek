import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseRequirement } from '@ludiek/engine/LudiekRequirement';

export interface Item<T extends BaseRequirement> {
  name: string;
  amount: number;
  req: T;
}

export class ShopPlugin extends LudiekPlugin {
  name: string = 'shop';

  public buy<T extends BaseRequirement>(item: Item<T>) {
    console.log(this._engine.hasRequirement(item.req));
  }
}
