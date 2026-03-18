import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/output/LudiekProducer';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

export const SetBuffDurationOutputSchema = z.strictObject({
  type: z.literal('/output/set-buff-duration'),
  buff: z.string(),
  amount: z.number().positive(),
});

export type SetBuffDurationOutput = z.infer<typeof SetBuffDurationOutputSchema>;

type Dependencies = {
  plugins: [BuffPlugin];
};

export class SetBuffDurationProducer extends LudiekProducer<SetBuffDurationOutput, Dependencies> {
  readonly schema = SetBuffDurationOutputSchema;

  canProduce(): boolean {
    return true;
  }

  produce(output: SetBuffDurationOutput): void {
    this.engine.plugins.buff.setBuff(output.buff, output.amount);
  }
}
