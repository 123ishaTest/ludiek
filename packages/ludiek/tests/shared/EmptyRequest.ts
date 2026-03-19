import { z } from 'zod';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

export const EmptyRequestSchema = z.strictObject({
  type: z.literal('/request/empty'),
});

export type EmptyRequest = z.infer<typeof EmptyRequestSchema>;

export class EmptyController extends LudiekController<EmptyRequest> {
  readonly schema = EmptyRequestSchema;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(request: EmptyRequest): void {
    return;
  }
}
