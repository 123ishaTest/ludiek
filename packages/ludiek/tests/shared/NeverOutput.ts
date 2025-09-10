import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';

export class NeverOutput extends LudiekOutput<{ type: '/output/never'; amount: number }> {
  readonly type = '/output/never';

  public canGain(): boolean {
    return false;
  }

  public gain(): void {
    // Nothing interesting happens.
  }
}
