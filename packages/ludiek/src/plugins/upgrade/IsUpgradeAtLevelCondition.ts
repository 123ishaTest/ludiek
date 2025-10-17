import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';

interface IsUpgradeAtLevelCondition extends BaseCondition {
  type: '/condition/is-upgrade-at-level';
  upgrade: string;
  level: number;
}

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class IsUpgradeAtLevelEvaluator extends LudiekEvaluator<IsUpgradeAtLevelCondition, Dependencies> {
  readonly type = '/condition/is-upgrade-at-level';

  evaluate(condition: IsUpgradeAtLevelCondition): boolean {
    return this.engine.plugins.upgrade.getLevel(condition.upgrade) >= condition.level;
  }
}
