import z from 'zod';
import { DummyModifier } from '@tests/shared/DummyBonus';
import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';

export const ModifiedInputSchema = z.strictObject({
  type: z.literal('/input/modified'),
  amount: z.number(),
});

export type ModifiedInput = z.infer<typeof ModifiedInputSchema>;

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * A basic consumer that has a modifier
 */
export class ModifiedConsumer extends LudiekConsumer<ModifiedInput, Dependencies> {
  readonly schema = ModifiedInputSchema;

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
