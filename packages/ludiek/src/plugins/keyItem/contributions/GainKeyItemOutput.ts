import { z } from 'zod';
import { KeyItemPlugin } from '@ludiek/plugins/keyItem/KeyItemPlugin';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';

export const GainKeyItemOutputSchema = z.strictObject({
  type: z.literal('/output/gain-key-item'),
  item: z.string(),
  amount: z.literal(1).default(1),
});

export type GainKeyItemOutput = z.infer<typeof GainKeyItemOutputSchema>;

type Dependencies = {
  plugins: [KeyItemPlugin];
};

export class GainKeyItemProducer extends LudiekProducer<GainKeyItemOutput, Dependencies> {
  readonly schema = GainKeyItemOutputSchema;

  constructor() {
    super();
  }

  canProduce(): boolean {
    return true;
  }

  produce(output: GainKeyItemOutput): void {
    this.engine.plugins.keyItem.gainKeyItem(output.item);
  }
}
