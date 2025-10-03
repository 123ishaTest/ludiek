import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class NeverOutput extends LudiekProducer<{ type: '/output/never'; amount: number }> {
  readonly type = '/output/never';

  public canGain(): boolean {
    return false;
  }

  public gain(): void {
    // Nothing interesting happens.
  }
}
