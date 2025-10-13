import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { DummyModifier } from '@tests/shared/DummyBonus';

export interface ModifiedOutput {
  type: '/output/modified';
  amount: number;
}

type Dependencies = {
  modifiers: [DummyModifier];
};

/**
 * A basic producer that has a modifier
 */
export class ModifiedProducer extends LudiekProducer<ModifiedOutput, Dependencies> {
  readonly type = '/output/modified';

  modify(output: ModifiedOutput): ModifiedOutput {
    output.amount *= this.getBonus({ type: '/bonus/dummy' });
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
