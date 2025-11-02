import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasScalarStatisticCondition extends BaseCondition {
  type: '/condition/has-scalar-statistic';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [StatisticPlugin];
};

export class HasScalarStatisticEvaluator extends LudiekEvaluator<HasScalarStatisticCondition, Dependencies> {
  readonly type = '/condition/has-scalar-statistic';

  evaluate(condition: HasScalarStatisticCondition): boolean {
    return this.engine.plugins.statistic.getScalarValue(condition.id) >= condition.amount;
  }
}
