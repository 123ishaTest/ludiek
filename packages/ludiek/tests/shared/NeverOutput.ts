import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export class NeverProducer extends LudiekProducer<{ type: '/output/never'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/output/never'),
    amount: z.number(),
  });

  public canProduce(): boolean {
    return false;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
