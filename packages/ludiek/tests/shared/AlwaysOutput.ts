import { LudiekOutput } from '@ludiek/engine/output/LudiekOutput';

export class AlwaysOutput extends LudiekOutput<{ type: '/output/always'; amount: number }> {
  readonly type = '/output/always';

  public canGain(): boolean {
    return true;
  }

  public gain(): void {
    // Nothing interesting happens.
  }
}
