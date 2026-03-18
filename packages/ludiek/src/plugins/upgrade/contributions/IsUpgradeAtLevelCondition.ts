import { z } from 'zod';
import { LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';

export const IsUpgradeAtLevelConditionSchema = z.strictObject({
  type: z.literal('/condition/is-upgrade-at-level'),
  upgrade: z.string(),
  level: z.number(),
});

export type IsUpgradeAtLevelCondition = z.infer<typeof IsUpgradeAtLevelConditionSchema>;

type Dependencies = {
  plugins: [UpgradePlugin];
};

export class IsUpgradeAtLevelEvaluator extends LudiekEvaluator<IsUpgradeAtLevelCondition, Dependencies> {
  readonly schema = IsUpgradeAtLevelConditionSchema;

  evaluate(condition: IsUpgradeAtLevelCondition): boolean {
    return this.engine.plugins.upgrade.getLevel(condition.upgrade) >= condition.level;
  }
}
