import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export class AlwaysConsumer extends LudiekConsumer<{ type: '/input/always'; amount: number }> {
  readonly type = '/input/always';

  canLose(): boolean {
    return true;
  }

  lose(): void {
    // Nothing interesting happens.
  }
}
