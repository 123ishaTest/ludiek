import z, { ZodType } from 'zod';
import { BaseConditionSchema } from '@ludiek/engine/condition/LudiekEvaluator';
import { BaseInputSchema } from '@ludiek/engine/input/LudiekConsumer';
import { BaseOutputSchema } from '@ludiek/engine/output/LudiekProducer';
import { BaseRequestSchema } from '@ludiek/engine/request/LudiekController';
import { BonusContributionSchema } from '@ludiek/engine/bonus/LudiekModifier';
import { DEFAULT_ID } from '@ludiek/engine/LudiekEngine';

export interface LudiekContent {
  kind: string;
  schema: ZodType<{ id: string }>;
}

export const registry = new Map<string, Map<string, z.ZodTypeAny>>();

export const deferSchema = <Schema extends z.ZodTypeAny>(id: string, engineId: string) =>
  z.lazy<Schema>(() => {
    const schema = registry.get(engineId)?.get(id);

    if (!schema) {
      throw new Error(`Unknown engine schema: ${id}`);
    }

    return schema as Schema;
  });

/**
 * Expose a zod-like interface.
 */
export const l = {
  condition: (engineId = DEFAULT_ID) => deferSchema<typeof BaseConditionSchema>('LUDIEK_CONDITION', engineId),
  input: (engineId = DEFAULT_ID) => deferSchema<typeof BaseInputSchema>('LUDIEK_INPUT', engineId),
  output: (engineId = DEFAULT_ID) => deferSchema<typeof BaseOutputSchema>('LUDIEK_OUTPUT', engineId),
  request: (engineId = DEFAULT_ID) => deferSchema<typeof BaseRequestSchema>('LUDIEK_REQUEST', engineId),
  bonus: (engineId = DEFAULT_ID) => deferSchema<typeof BonusContributionSchema>('LUDIEK_BONUS', engineId),
};
