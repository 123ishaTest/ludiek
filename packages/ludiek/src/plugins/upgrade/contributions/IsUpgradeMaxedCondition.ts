import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';

export const IsUpgradeMaxedConditionSchema = z.strictObject({
  type: z.literal('/condition/is-upgrade-maxed'),
  upgrade: z.string(),
});

export type IsUpgradeMaxedCondition = z.infer<typeof IsUpgradeMaxedConditionSchema>;

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class IsUpgradeMaxedEvaluator extends LudiekEvaluator<IsUpgradeMaxedCondition, Dependencies> {
  readonly schema = IsUpgradeMaxedConditionSchema;

  evaluate(condition: IsUpgradeMaxedCondition): boolean {
    return this.engine.plugins.upgrade.isMaxLevel(condition.upgrade);
  }
}
