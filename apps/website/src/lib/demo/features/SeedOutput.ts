import z from 'zod';
import { type CurrencyPlugin, LudiekProducer } from '@123ishatest/ludiek';
import type { SeedModifier } from '$lib/demo/features/SeedBonus';
import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import { PlantIdSchema } from '$lib/demo/content';

export const SeedOutputSchema = z.strictObject({
  type: z.literal('/output/seed'),
  plant: PlantIdSchema,
  amount: z.number().positive(),
});

export type SeedOutput = z.infer<typeof SeedOutputSchema>;

interface Dependencies {
  plugins: [CurrencyPlugin];
  modifiers: [SeedModifier, GlobalSeedModifier];
}

export class SeedProducer extends LudiekProducer<SeedOutput, Dependencies> {
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
    this.engine.plugins.currency.gainCurrency({
      amount: output.amount,
      id: output.plant,
    });
  }
}
