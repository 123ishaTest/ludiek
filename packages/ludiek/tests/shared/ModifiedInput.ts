import { DummyModifier } from '@tests/shared/DummyBonus';
import { BaseInput, LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export interface ModifiedInput extends BaseInput {
  type: '/input/modified';
  amount: number;
}

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * A basic consumer that has a modifier
 */
export class ModifiedConsumer extends LudiekConsumer<ModifiedInput, Dependencies> {
  readonly type = '/input/modified';

  modify(input: ModifiedInput): ModifiedInput {
    input.amount *= this.getBonus({ type: '/bonus/dummy' });
    return input;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public canConsume(input: ModifiedInput): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public consume(input: ModifiedInput): void {
    // Nothing interesting happens.
  }
}
