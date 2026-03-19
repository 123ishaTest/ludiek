import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { z } from 'zod';

export class AlwaysConsumer extends LudiekConsumer<{ type: '/input/always'; amount: number }> {
  readonly schema = z.strictObject({
    type: z.literal('/input/always'),
    amount: z.number(),
  });

  canConsume(): boolean {
    return true;
  }

  consume(): void {
    // Nothing interesting happens.
  }
}
