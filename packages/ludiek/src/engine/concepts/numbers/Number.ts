import { z } from 'zod';
import { EngineConceptDefinition } from '@ludiek/engine/concepts/EngineConceptDefinition';
import type { Features } from '@ludiek/features/Features';
import { EngineConceptSchema } from '@ludiek/engine/concepts/EngineConceptSchema';

/**
 * Extend this class to create a new number definition.
 */
export abstract class NumberDefinition extends EngineConceptDefinition {
  /**
   * Returns a numbers based on the Number content
   * @param number the number content
   * @param features the game features that could influence to outcome
   */
  abstract evaluate(number: Number, features: Features): number;
}

export const NumberSchema = EngineConceptSchema.brand<'number'>();
export type Number = z.infer<typeof NumberSchema>;
