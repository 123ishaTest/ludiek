import { z } from 'zod';
import { RequirementDefinition, RequirementSchema } from '@ludiek/engine/concepts/requirements/Requirement';
import type { Features } from '@ludiek/features/Features';

export const SettingEnabledRequirementSchema = RequirementSchema.extend({
  type: z.literal('setting-enabled'),
  id: z.string(),
})
  .brand<'requirement'>()
  .meta({
    title: 'SettingEnabledRequirement',
    description: 'Whether the Setting is enabled (set to true)',
  });

export type SettingEnabledRequirement = z.infer<typeof SettingEnabledRequirementSchema>;

export class SettingEnabledRequirementDefinition extends RequirementDefinition {
  key = 'setting-enabled';

  schema = SettingEnabledRequirementSchema;

  isFulfilled(requirement: SettingEnabledRequirement, features: Features): boolean {
    return features.settings.get(requirement.id) === true;
  }
}
