import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class AlwaysOutput extends LudiekProducer<{ type: '/output/always'; amount: number }> {
  readonly type = '/output/always';

  public canGain(): boolean {
    return true;
  }

  public gain(): void {
    // Nothing interesting happens.
  }
}
