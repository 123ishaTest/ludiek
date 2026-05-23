import { z } from 'zod';
import { LudiekController } from '@ludiek/engine/request/LudiekController';

export const MultiArgumentRequestSchema = z.strictObject({
  type: z.literal('/request/multi-argument'),
  first: z.string(),
  second: z.number(),
});

export type MultiArgumentRequest = z.infer<typeof MultiArgumentRequestSchema>;

export class MultiArgumentController extends LudiekController<MultiArgumentRequest> {
  readonly schema = MultiArgumentRequestSchema;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(request: MultiArgumentRequest) {
    return this.success();
  }
}
