import z from 'zod';
import { Ludiek } from '$lib/demo/game';

export const SeedOutputSchema = z.strictObject({
  type: z.literal('/output/seed'),
  plant: z.string(),
  amount: z.number().positive(),
});

export type SeedOutput = z.infer<typeof SeedOutputSchema>;

export class SeedProducer extends Ludiek.Producer<SeedOutput> {
  readonly schema = SeedOutputSchema;

  modify(output: SeedOutput): SeedOutput {
    output.amount *= this.engine.getBonus({ type: '/bonus/seed', seed: output.plant });
    output.amount *= this.engine.getBonus({ type: '/bonus/seed-global' });
    return output;
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: SeedOutput): void {
    this.engine.plugins.currency.gainCurrency({
      amount: output.amount,
      id: output.plant,
    });
  }
}
