import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/mutation/LudiekProducer';

export class AlwaysProducer extends LudiekProducer<{ type: '/mutation/always'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/mutation/always'),
    amount: z.number(),
  });

  public canProduce(): boolean {
    return true;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
