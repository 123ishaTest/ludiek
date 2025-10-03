import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export interface EmptyInput extends BaseInput {
  type: '/input/empty';
}

export class EmptyConsumer extends LudiekConsumer<EmptyInput> {
  readonly type = '/input/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canLose(input: EmptyInput): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lose(input: EmptyInput): void {
    return;
  }
}
