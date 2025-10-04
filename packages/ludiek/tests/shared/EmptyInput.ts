import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export interface EmptyInput extends BaseInput {
  type: '/input/empty';
}

export class EmptyConsumer extends LudiekConsumer<EmptyInput> {
  readonly type = '/input/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canConsume(input: EmptyInput): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  consume(input: EmptyInput): void {
    return;
  }
}
