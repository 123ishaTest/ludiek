import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class AlwaysProducer extends LudiekProducer<{ type: '/output/always'; amount: number }> {
  readonly type = '/output/always';

  public canProduce(): boolean {
    return true;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
