import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class NeverProducer extends LudiekProducer<{ type: '/output/never'; amount: number }> {
  readonly type = '/output/never';

  public canProduce(): boolean {
    return false;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
