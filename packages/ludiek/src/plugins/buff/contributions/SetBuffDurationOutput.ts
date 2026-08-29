import { z } from 'zod';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

export const SetBuffDurationOutputSchema = z.strictObject({
  type: z.literal('/mutation/set-buff-duration'),
  buff: z.string(),
  amount: z.number().positive(),
});

export type SetBuffDurationOutput = z.infer<typeof SetBuffDurationOutputSchema>;

type Dependencies = {
  plugins: [BuffPlugin];
};

export class SetBuffDurationProducer extends LudiekMutator<SetBuffDurationOutput, Dependencies> {
  readonly schema = SetBuffDurationOutputSchema;

  canApply(): boolean {
    return true;
  }

  apply(output: SetBuffDurationOutput): void {
    this.engine.plugins.buff.setBuff(output.buff, output.amount);
  }
}
