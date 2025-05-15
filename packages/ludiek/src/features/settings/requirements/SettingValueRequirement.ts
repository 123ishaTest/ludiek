import { z } from 'zod';
import { RequirementDefinition, RequirementSchema } from '@ludiek/engine/concepts/requirements/Requirement';
import { SettingValueSchema } from '@ludiek/features/settings/content/SettingDetail';
import type { Features } from '@ludiek/features/Features';

export const SettingValueRequirementSchema = RequirementSchema.extend({
  type: z.literal('setting-value'),
  id: z.string(),
  value: SettingValueSchema,
})
  .brand<'requirement'>()
  .meta({
    title: 'SettingValueRequirement',
    description: 'Whether the Setting has the required value',
  });

export type SettingValueRequirement = z.infer<typeof SettingValueRequirementSchema>;

export class SettingValueRequirementDefinition extends RequirementDefinition {
  key = 'setting-value';

  schema = SettingValueRequirementSchema;

  isFulfilled(requirement: SettingValueRequirement, features: Features): boolean {
    return features.settings.get(requirement.id) === requirement.value;
  }
}
