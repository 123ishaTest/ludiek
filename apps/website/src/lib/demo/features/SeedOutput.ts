import z from 'zod';
import { CustomProducer } from '@123ishatest/ludiek';

export const SeedOutputSchema = z.strictObject({
  type: z.literal('/output/seed'),
  plant: z.string(),
  amount: z.number().positive(),
});

export type SeedOutput = z.infer<typeof SeedOutputSchema>;

// 5. But this is your party, you already know what your engine is made of
export class SeedProducer extends CustomProducer<SeedOutput> {
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
    // 7. We can even produce ourselves!
    //  But you know, don't.
    this.engine.produce({ type: '/output/seed', plant: 'plant', amount: 4 });
    this.engine.plugins.currency.gainCurrency({
      amount: output.amount,
      id: output.plant,
    });
  }
}
