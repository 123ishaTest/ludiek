import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { StatisticPlugin } from '@ludiek/plugins/statistic/StatisticPlugin';

interface HasMapStatisticCondition extends BaseCondition {
  type: '/condition/has-map-statistic';
  id: string;
  key: string;
  amount: number;
}

type Dependencies = {
  plugins: [StatisticPlugin];
};

export class HasMapStatisticEvaluator extends LudiekEvaluator<HasMapStatisticCondition, Dependencies> {
  readonly type = '/condition/has-map-statistic';

  evaluate(condition: HasMapStatisticCondition): boolean {
    return this.engine.plugins.statistic.getMapStatistic(condition.id, condition.key) >= condition.amount;
  }
}
