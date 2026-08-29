import { z } from 'zod';
import { LudiekProducer } from '@ludiek/engine/mutation/LudiekProducer';

export const EmptyOutputSchema = z.strictObject({
  type: z.literal('/mutation/empty'),
  amount: z.literal(1).default(1),
});

export type EmptyOutput = z.infer<typeof EmptyOutputSchema>;

export class EmptyProducer extends LudiekProducer<EmptyOutput> {
  readonly schema = EmptyOutputSchema;

  canProduce(): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  produce(output: EmptyOutput): void {
    return;
  }
}
