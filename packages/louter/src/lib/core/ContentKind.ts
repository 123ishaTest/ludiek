import type { ZodType } from 'zod';

export interface ContentKind<Schema extends ZodType> {
  kind: string;
  schema: Schema;
}
