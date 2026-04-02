import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { DummyModifier } from '@tests/shared/DummyBonus';

export const ModifiedOutputSchema = z.strictObject({
  type: z.literal('/output/modified'),
  amount: z.number(),
});

export type ModifiedOutput = z.infer<typeof ModifiedOutputSchema>;

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * A basic producer that has a modifier
 */
export class ModifiedProducer extends LudiekProducer<ModifiedOutput, Dependencies> {
  readonly schema = ModifiedOutputSchema;

  modify(output: ModifiedOutput): ModifiedOutput {
    output.amount *= this.engine.getBonus({ type: '/bonus/dummy' });
    return output;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public canProduce(output: ModifiedOutput): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public produce(output: ModifiedOutput): void {
    // Nothing interesting happens.
  }
}
