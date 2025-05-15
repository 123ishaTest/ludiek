import z from 'zod';
import { RequirementSchema } from '@ludiek/engine/concepts/requirements/Requirement';

export const SettingValueSchema = z.union([z.number(), z.string(), z.boolean()]);

export const SettingOptionSchema = z.object({
  name: z.string(),
  value: SettingValueSchema,
  requirement: z.optional(RequirementSchema),
});

export const BaseSettingSchema = z.object({
  type: z.string().describe('The type of setting'),
  id: z.string().describe('The hrid of the Setting'),
  name: z.string().describe('The display name'),
  default: SettingValueSchema.describe('The default value'),
  options: z
    .array(SettingOptionSchema)
    .optional()
    .describe('When provided, the Setting must always be set to a valid option'),
});

export const BooleanSettingSchema = BaseSettingSchema.extend({
  type: z.literal('boolean'),
  default: z.boolean().default(false),
  options: z
    .array(z.string())
    .length(2)
    .transform((labels) => {
      return labels.map((label, index) => {
        return {
          name: label,
          value: index === 0,
        };
      });
    }),
}).meta({
  title: 'BooleanSetting',
  description: 'A setting which can only be true or false',
});

export const NumberSettingSchema = BaseSettingSchema.omit({ options: true })
  .extend({
    type: z.literal('number'),
    default: z.number(),
    min: z.number().default(Number.MIN_SAFE_INTEGER).optional().describe('The minimum value this setting may take'),
    max: z.number().default(Number.MAX_SAFE_INTEGER).optional().describe('The maximum value this setting may take'),
  })
  .meta({
    title: 'NumberSetting',
    description: 'A setting which can be any number',
  });

export const SettingSchema = z.discriminatedUnion([BooleanSettingSchema, NumberSettingSchema]);

export type SettingValue = z.infer<typeof SettingValueSchema>;
export type SettingOption = z.infer<typeof SettingOptionSchema>;
export type SettingDetail = z.infer<typeof SettingSchema>;
export type NumberSettingDetail = z.infer<typeof NumberSettingSchema>;
export type BooleanSettingDetail = z.infer<typeof BooleanSettingSchema>;
