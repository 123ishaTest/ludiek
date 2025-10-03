import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasStatisticCondition extends BaseCondition {
  type: '/condition/has-statistic';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [StatisticPlugin];
};

export class HasStatisticEvaluator extends LudiekEvaluator<HasStatisticCondition, Dependencies> {
  readonly type = '/condition/has-statistic';

  evaluate(condition: HasStatisticCondition): boolean {
    return this.engine.plugins.statistic.getStatistic(condition.id) >= condition.amount;
  }
}
