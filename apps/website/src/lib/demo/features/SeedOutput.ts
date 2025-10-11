import { type BaseOutput, type CurrencyPlugin, LudiekProducer } from '@123ishatest/ludiek';
import type { LudiekDependencies } from '@123ishatest/ludiek/dist/engine/LudiekEngineConcept';
import type { SeedModifier } from '$lib/demo/features/SeedBonus';
import { GlobalSeedModifier } from '$lib/demo/features/GlobalSeedBonus';
import type { PlantId } from '$lib/demo/demo.svelte';

export interface SeedOutput extends BaseOutput {
  type: '/output/seed';
  plant: PlantId;
  amount: number;
}

interface Dependencies extends LudiekDependencies {
  plugins: [CurrencyPlugin];
  modifiers: [SeedModifier, GlobalSeedModifier];
}

export class SeedProducer extends LudiekProducer<SeedOutput, Dependencies> {
  readonly type = '/output/seed';

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
