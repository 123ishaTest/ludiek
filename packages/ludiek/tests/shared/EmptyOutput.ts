import { BaseOutput, LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export interface EmptyOutput extends BaseOutput {
  type: '/output/empty';
}

export class EmptyProducer extends LudiekProducer<EmptyOutput> {
  readonly type = '/output/empty';

  canProduce(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  produce(output: EmptyOutput): void {
    return;
  }
}
