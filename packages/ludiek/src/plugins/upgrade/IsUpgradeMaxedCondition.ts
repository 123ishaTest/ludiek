import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';

interface IsUpgradeMaxedCondition extends BaseCondition {
  type: '/condition/is-upgrade-maxed';
  upgrade: string;
}

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class IsUpgradeMaxedEvaluator extends LudiekEvaluator<IsUpgradeMaxedCondition, Dependencies> {
  readonly type = '/condition/is-upgrade-maxed';

  evaluate(condition: IsUpgradeMaxedCondition): boolean {
    return this.engine.plugins.upgrade.isMaxLevel(condition.upgrade);
  }
}
