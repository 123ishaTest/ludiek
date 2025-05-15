import { z } from 'zod';

export const EngineConceptSchema = z.object({
  type: z.string(),
});
