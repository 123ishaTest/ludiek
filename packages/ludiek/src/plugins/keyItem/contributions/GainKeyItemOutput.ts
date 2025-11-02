import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

interface GainKeyItemOutput extends BaseOutput {
  type: '/output/gain-key-item';
  item: string;
}

type Dependencies = {
  plugins: [KeyItemPlugin];
};

export class GainKeyItemProducer extends LudiekProducer<GainKeyItemOutput, Dependencies> {
  readonly type = '/output/gain-key-item';

  constructor() {
    super();
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: GainKeyItemOutput): void {
    this.engine.plugins.keyItem.gainKeyItem(output.item);
  }
}
