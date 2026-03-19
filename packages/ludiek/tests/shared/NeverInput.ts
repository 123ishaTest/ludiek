import { z } from 'zod';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export class NeverConsumer extends LudiekConsumer<{ type: '/input/never'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/input/never'),
    amount: z.number(),
  });

  canConsume(): boolean {
    return false;
  }

  consume(): void {
    // Nothing interesting happens.
  }
}
