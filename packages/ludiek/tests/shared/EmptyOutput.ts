import { BaseOutputShape, LudiekOutput } from '@ludiek/engine/outputs/LudiekOutput';

export interface EmptyOutputShape extends BaseOutputShape {
  type: '/output/empty';
}

export class EmptyOutput implements LudiekOutput<EmptyOutputShape> {
  readonly type = '/output/empty';

  canGain(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  gain(output: EmptyOutputShape): void {
    return;
  }
}
