import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';

interface CanBuyUpgradeCondition extends BaseCondition {
  type: '/condition/can-buy-upgrade';
  upgrade: string;
}

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class CanBuyUpgradeEvaluator extends LudiekEvaluator<CanBuyUpgradeCondition, Dependencies> {
  readonly type = '/condition/can-buy-upgrade';

  evaluate(condition: CanBuyUpgradeCondition): boolean {
    return this.engine.plugins.upgrade.canBuyUpgrade(condition.upgrade);
  }
}
