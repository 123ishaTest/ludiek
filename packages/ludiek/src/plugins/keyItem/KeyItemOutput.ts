import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface KeyItemOutput extends BaseOutput {
  type: '/output/key-item';
  item: string;
}

type Dependencies = {
  plugins: [KeyItemPlugin];
};

export class KeyItemProducer extends LudiekProducer<KeyItemOutput, Dependencies> {
  readonly type = '/output/key-item';

  constructor() {
    super();
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: KeyItemOutput): void {
    this.engine.plugins.keyItem.gainKeyItem(output.item);
  }
}
