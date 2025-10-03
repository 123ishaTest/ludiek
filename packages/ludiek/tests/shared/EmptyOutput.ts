import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export interface EmptyOutputShape extends BaseOutput {
  type: '/output/empty';
}

export class EmptyOutput extends LudiekProducer<EmptyOutputShape> {
  readonly type = '/output/empty';

  canGain(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  gain(output: EmptyOutputShape): void {
    return;
  }
}
