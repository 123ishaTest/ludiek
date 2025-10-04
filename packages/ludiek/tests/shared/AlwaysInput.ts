import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export class AlwaysConsumer extends LudiekConsumer<{ type: '/input/always'; amount: number }> {
  readonly type = '/input/always';

  canConsume(): boolean {
    return true;
  }

  consume(): void {
    // Nothing interesting happens.
  }
}
