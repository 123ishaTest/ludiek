import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

interface SetBuffDurationOutput extends BaseOutput {
  type: '/output/set-buff-duration';
  buff: string;
}

type Dependencies = {
  plugins: [BuffPlugin];
};

export class SetBuffDurationProducer extends LudiekProducer<SetBuffDurationOutput, Dependencies> {
  readonly type = '/output/set-buff-duration';

  canProduce(): boolean {
    return true;
  }

  produce(output: SetBuffDurationOutput): void {
    this.engine.plugins.buff.setBuff(output.buff, output.amount);
  }
}
