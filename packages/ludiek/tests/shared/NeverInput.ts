import { LudiekInput } from '@ludiek/engine/input/LudiekInput';

export class NeverInput extends LudiekInput<{ type: '/input/never'; amount: number }> {
  readonly type = '/input/never';

  canLose(): boolean {
    return false;
  }

  lose(): void {
    // Nothing interesting happens.
  }
}
