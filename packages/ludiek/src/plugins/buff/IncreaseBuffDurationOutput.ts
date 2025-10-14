import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

interface IncreaseBuffDurationOutput extends BaseOutput {
  type: '/output/increase-buff-duration';
  buff: string;
}

type Dependencies = {
  plugins: [BuffPlugin];
};

export class IncreaseBuffDurationProducer extends LudiekProducer<IncreaseBuffDurationOutput, Dependencies> {
  readonly type = '/output/increase-buff-duration';

  canProduce(): boolean {
    return true;
  }

  produce(output: IncreaseBuffDurationOutput): void {
    this.engine.plugins.buff.increaseBuff(output.buff, output.amount);
  }
}
