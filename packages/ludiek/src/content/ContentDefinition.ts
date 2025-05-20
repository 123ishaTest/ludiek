import type { ZodType } from 'zod';

export interface ContentDefinition {
  key: string;
  schema: ZodType;
}
