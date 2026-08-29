import z, { ZodType } from 'zod';
import { BaseConditionSchema } from '@ludiek/engine/condition/LudiekEvaluator';
import { BaseInputSchema } from '@ludiek/engine/input/LudiekConsumer';
import { BaseMutationSchema } from '@ludiek/engine/mutation/LudiekMutator';
import { BaseRequestSchema } from '@ludiek/engine/request/LudiekController';
import { BonusContributionSchema } from '@ludiek/engine/bonus/LudiekModifier';
import { DEFAULT_ID } from '@ludiek/engine/LudiekEngine';
import { LudiekRegistryError } from '@ludiek/engine/LudiekError';
import { ref } from '@123ishatest/louter';

export interface LudiekContent {
  kind: string;
  schema: ZodType<{ id: string }>;
}

export const registry = new Map<string, Map<string, z.ZodTypeAny>>();

export const deferSchema = <Schema extends z.ZodTypeAny>(id: string, engineId: string) =>
  z.lazy<Schema>(() => {
    const schema = registry.get(engineId)?.get(id);

    if (!schema) {
      throw new LudiekRegistryError(`Unknown engine schema: ${id}`);
    }

    return schema as Schema;
  });

/**
 * Expose a zod-like interface.
 */
export const l = {
  content: (kind: string) => ref(kind).meta({ ludiek: { reference: kind } }),
  condition: (engineId = DEFAULT_ID) => deferSchema<typeof BaseConditionSchema>('LUDIEK_CONDITION', engineId),
  input: (engineId = DEFAULT_ID) => deferSchema<typeof BaseInputSchema>('LUDIEK_INPUT', engineId),
  mutation: (engineId = DEFAULT_ID) => deferSchema<typeof BaseMutationSchema>('LUDIEK_MUTATION', engineId),
  request: (engineId = DEFAULT_ID) => deferSchema<typeof BaseRequestSchema>('LUDIEK_REQUEST', engineId),
  bonus: (engineId = DEFAULT_ID) => deferSchema<typeof BonusContributionSchema>('LUDIEK_BONUS', engineId),
};
