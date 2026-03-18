import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

export const HasScalarStatisticConditionSchema = z.strictObject({
  type: z.literal('/condition/has-scalar-statistic'),
  id: z.string(),
  amount: z.number(),
});

export type HasScalarStatisticCondition = z.infer<typeof HasScalarStatisticConditionSchema>;

type Dependencies = {
  plugins: [StatisticPlugin];
};

export class HasScalarStatisticEvaluator extends LudiekEvaluator<HasScalarStatisticCondition, Dependencies> {
  readonly schema = HasScalarStatisticConditionSchema;

  evaluate(condition: HasScalarStatisticCondition): boolean {
    return this.engine.plugins.statistic.getScalarValue(condition.id) >= condition.amount;
  }
}
