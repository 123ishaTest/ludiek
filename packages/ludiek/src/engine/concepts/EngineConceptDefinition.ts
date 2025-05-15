import type { ZodType } from 'zod';

export abstract class EngineConceptDefinition {
  abstract key: string;
  abstract schema: ZodType<{ type: string }>;
}
