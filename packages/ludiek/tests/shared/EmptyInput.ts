import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export interface EmptyInputShape extends BaseInput {
  type: '/input/empty';
}

export class EmptyInput extends LudiekConsumer<EmptyInputShape> {
  readonly type = '/input/empty';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canLose(input: EmptyInputShape): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  lose(input: EmptyInputShape): void {
    return;
  }
}
