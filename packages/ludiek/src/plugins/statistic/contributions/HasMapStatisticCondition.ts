import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

export const HasMapStatisticConditionSchema = z.strictObject({
  type: z.literal('/condition/has-map-statistic'),
  id: z.string(),
  key: z.string(),
  amount: z.number(),
});

export type HasMapStatisticCondition = z.infer<typeof HasMapStatisticConditionSchema>;

type Dependencies = {
  plugins: [StatisticPlugin];
};

export class HasMapStatisticEvaluator extends LudiekEvaluator<HasMapStatisticCondition, Dependencies> {
  readonly schema = HasMapStatisticConditionSchema;

  evaluate(condition: HasMapStatisticCondition): boolean {
    return this.engine.plugins.statistic.getMapValue(condition.id, condition.key) >= condition.amount;
  }
}
