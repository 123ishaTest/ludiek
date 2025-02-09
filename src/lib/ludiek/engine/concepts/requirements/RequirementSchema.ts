import { z } from 'zod';

export const RequirementSchema = z.object({
  type: z.string(),
});

export type Requirement = z.infer<typeof RequirementSchema>;
