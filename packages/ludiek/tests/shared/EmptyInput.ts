import { LudiekConsumer } from '@ludiek/engine/input/LudiekConsumer';
import { z } from 'zod';

export const EmptyInputSchema = z.strictObject({
  type: z.literal('/input/empty'),
  amount: z.number(),
});

export type EmptyInput = z.infer<typeof EmptyInputSchema>;

export class EmptyConsumer extends LudiekConsumer<EmptyInput> {
  readonly schema = EmptyInputSchema;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  canConsume(input: EmptyInput): boolean {
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  consume(input: EmptyInput): void {
    return;
  }
}
