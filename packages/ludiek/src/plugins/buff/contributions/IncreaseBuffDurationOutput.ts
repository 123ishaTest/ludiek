import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

export const IncreaseBuffDurationOutputSchema = z.strictObject({
  type: z.literal('/output/increase-buff-duration'),
  buff: z.string(),
  amount: z.number().positive(),
});

export type IncreaseBuffDurationOutput = z.infer<typeof IncreaseBuffDurationOutputSchema>;

type Dependencies = {
  plugins: [BuffPlugin];
};

export class IncreaseBuffDurationProducer extends LudiekProducer<IncreaseBuffDurationOutput, Dependencies> {
  readonly schema = IncreaseBuffDurationOutputSchema;

  canProduce(): boolean {
    return true;
  }

  produce(output: IncreaseBuffDurationOutput): void {
    this.engine.plugins.buff.increaseBuff(output.buff, output.amount);
  }
}
