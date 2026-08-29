import { z } from 'zod';
import { LudiekMutator } from '@ludiek/engine/mutation/LudiekMutator';
import { BuffPlugin } from '@ludiek/plugins/buff/BuffPlugin';

export const IncreaseBuffDurationMutationSchema = z.strictObject({
  type: z.literal('/mutation/increase-buff-duration'),
  buff: z.string(),
  amount: z.number().positive(),
});

export type IncreaseBuffDurationMutation = z.infer<typeof IncreaseBuffDurationMutationSchema>;

type Dependencies = {
  plugins: [BuffPlugin];
};

export class IncreaseBuffDurationMutator extends LudiekMutator<IncreaseBuffDurationMutation, Dependencies> {
  readonly schema = IncreaseBuffDurationMutationSchema;

  canApply(): boolean {
    return true;
  }

  apply(mutation: IncreaseBuffDurationMutation): void {
    this.engine.plugins.buff.increaseBuff(mutation.buff, mutation.amount);
  }
}
