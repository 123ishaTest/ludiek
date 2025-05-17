import { z } from 'zod';
import { RequirementDefinition, RequirementSchema } from '@ludiek/engine/concepts/requirements/Requirement';
import type { Features } from '@ludiek/features/Features';

export const StatisticRequirementSchema = RequirementSchema.extend({
  type: z.literal('statistic'),
  id: z.string(),
  value: z.number().positive(),
})
  .meta({
    title: 'StatisticRequirement',
    description: 'Whether the specified statistic is the required value',
    examples: [
      {
        type: 'statistic',
        id: '/stat/total-money',
        value: 100,
      },
    ],
  })
  .brand<'requirement'>();

export type StatisticRequirement = z.infer<typeof StatisticRequirementSchema>;

export class StatisticRequirementDefinition extends RequirementDefinition {
  key = 'statistic';

  schema = StatisticRequirementSchema;

  isFulfilled(requirement: StatisticRequirement, features: Features): boolean {
    return features.statistics.get(requirement.id).get() >= requirement.value;
  }
}
