import { LudiekInput } from '@ludiek/engine/input/LudiekInput';

export class AlwaysInput extends LudiekInput<{ type: '/input/always'; amount: number }> {
  readonly type = '/input/always';

  canLose(): boolean {
    return true;
  }

  lose(): void {
    // Nothing interesting happens.
  }
}
