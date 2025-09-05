import { BaseInputShape, LudiekInput } from '@ludiek/engine/inputs/LudiekInput';

export interface EmptyInputShape extends BaseInputShape {
  type: '/input/empty';
}

export class EmptyInput implements LudiekInput<EmptyInputShape> {
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
