import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface KeyItemOutput extends BaseOutput {
  type: '/output/key-item';
  item: string;
}

export class KeyItemProducer extends LudiekProducer<KeyItemOutput> {
  readonly type = '/output/key-item';

  private _keyItem: KeyItemPlugin;

  constructor(keyItem: KeyItemPlugin) {
    super();
    this._keyItem = keyItem;
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: KeyItemOutput): void {
    this._keyItem.gainKeyItem(output.item);
  }
}
