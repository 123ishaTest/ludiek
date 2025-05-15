import { z } from 'zod';
import { EngineConceptDefinition } from '@ludiek/engine/concepts/EngineConceptDefinition';
import type { Features } from '@ludiek/features/Features';
import { EngineConceptSchema } from '@ludiek/engine/concepts/EngineConceptSchema';

/**
 * Extend this class to create a new requirement definition.
 */
export abstract class RequirementDefinition extends EngineConceptDefinition {
  /**
   * Return
   * @param requirement the requirement to check against
   * @param features the game state to compare the requirements to
   */
  abstract isFulfilled(requirement: Requirement, features: Features): boolean;
}

export const RequirementSchema = EngineConceptSchema.brand<'requirement'>();

export type Requirement = z.infer<typeof RequirementSchema>;
