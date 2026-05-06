import { ZodType } from 'zod';
import { BaseConditionSchema } from '@ludiek/engine/condition/LudiekEvaluator';
import { BaseOutputSchema } from '@ludiek/engine/output/LudiekProducer';
import { BaseInputSchema } from '@ludiek/engine/input/LudiekConsumer';
import { BaseRequestSchema } from './request/LudiekController';
import { BaseBonusSchema } from '@ludiek/engine/modifier/LudiekModifier';

export interface LudiekContent {
  kind: string;
  schema: ZodType<{ id: string }>;
}

export const ConditionPlaceholder = BaseConditionSchema.loose();
export const InputPlaceholder = BaseInputSchema.loose();
export const OutputPlaceholder = BaseOutputSchema.loose();
export const RequestPlaceholder = BaseRequestSchema.loose();
export const BonusPlaceholder = BaseBonusSchema.loose();

/**
 * Expose a zod-like interface.
 */
export const l = {
  condition: () => ConditionPlaceholder,
  input: () => InputPlaceholder,
  output: () => OutputPlaceholder,
  request: () => RequestPlaceholder,
  bonus: () => BonusPlaceholder,
};
