import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export class NeverConsumer extends LudiekConsumer<{ type: '/input/never'; amount: number }> {
  readonly type = '/input/never';

  canLose(): boolean {
    return false;
  }

  lose(): void {
    // Nothing interesting happens.
  }
}
