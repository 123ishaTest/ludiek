import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class AlwaysProducer extends LudiekProducer<{ type: '/output/always'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/output/always'),
    amount: z.number(),
  });

  public canProduce(): boolean {
    return true;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
