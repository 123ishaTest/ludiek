import z from 'zod';
import { LudiekProducer } from '@123ishatest/ludiek';

export const SeedOutputSchema = z.strictObject({
  type: z.literal('/output/seed'),
  plant: z.string(),
  amount: z.number().positive(),
});

export type SeedOutput = z.infer<typeof SeedOutputSchema>;

// interface Dependencies {
//   plugins: [CurrencyPlugin];
//   modifiers: [SeedModifier, GlobalSeedModifier];
//   evaluators: [HasCurrencyEvaluator]
// }

export class SeedProducer extends LudiekProducer<SeedOutput> {
  readonly schema = SeedOutputSchema;

  modify(output: SeedOutput): SeedOutput {
    output.amount *= this.getBonus({ type: '/bonus/seed', seed: output.plant });
    output.amount *= this.getBonus({ type: '/bonus/seed-global' });
    return output;
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: SeedOutput): void {
    // this.engine.dependencies.
    this.engine.evaluate({
      type: 'asdasd'
    })
    this.engine.plugins.currency.gainCurrency({
      amount: output.amount,
      id: output.plant,
    });
  }
}
