import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export interface EmptyOutput extends BaseOutput {
  type: '/output/empty';
}

export class EmptyProducer extends LudiekProducer<EmptyOutput> {
  readonly type = '/output/empty';

  canGain(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  gain(output: EmptyOutput): void {
    return;
  }
}
