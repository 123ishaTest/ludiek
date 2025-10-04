import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export class NeverConsumer extends LudiekConsumer<{ type: '/input/never'; amount: number }> {
  readonly type = '/input/never';

  canConsume(): boolean {
    return false;
  }

  consume(): void {
    // Nothing interesting happens.
  }
}
