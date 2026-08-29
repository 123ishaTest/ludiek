import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/mutation/LudiekProducer';

export class NeverProducer extends LudiekProducer<{ type: '/mutation/never'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/mutation/never'),
    amount: z.number(),
  });

  public canProduce(): boolean {
    return false;
  }

  public produce(): void {
    // Nothing interesting happens.
  }
}
