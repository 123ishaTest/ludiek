import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { z } from 'zod';

export const CanBuyUpgradeConditionSchema = z.strictObject({
  type: z.literal('/condition/can-buy-upgrade'),
  upgrade: z.string(),
});

export type CanBuyUpgradeCondition = z.infer<typeof CanBuyUpgradeConditionSchema>;

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class CanBuyUpgradeEvaluator extends LudiekEvaluator<CanBuyUpgradeCondition, Dependencies> {
  readonly schema = CanBuyUpgradeConditionSchema;

  evaluate(condition: CanBuyUpgradeCondition): boolean {
    return this.engine.plugins.upgrade.canBuyUpgrade(condition.upgrade);
  }
}
