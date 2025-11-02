import { beforeEach, expect, it, vi } from 'vitest';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { CanBuyUpgradeEvaluator } from '@ludiek/plugins/upgrade/contributions/CanBuyUpgradeCondition';

const upgrade = new UpgradePlugin();
const evaluator = new CanBuyUpgradeEvaluator();

new LudiekEngine({
  plugins: [upgrade],
  evaluators: [evaluator],
});

beforeEach(() => {
  upgrade.loadContent([
    {
      id: '/upgrade/example',
      bonusPerLevel: [{ type: '/bonus/example', amount: +0.4 }],
      costPerLevel: [{ type: '/input/example', amount: 1 }],
      accumulateBonuses: false,
    },
  ]);
});

it('evaluates to false when we cannot buy', () => {
  // Act
  vi.spyOn(upgrade, 'canBuyUpgrade').mockReturnValue(false);
  const canAfford = evaluator.evaluate({
    type: '/condition/can-buy-upgrade',
    upgrade: '/upgrade/example',
  });

  // Assert
  expect(canAfford).toBe(false);
});

it('evaluates to true when we cannot buy', () => {
  // Act
  vi.spyOn(upgrade, 'canBuyUpgrade').mockReturnValue(true);
  const canAfford = evaluator.evaluate({
    type: '/condition/can-buy-upgrade',
    upgrade: '/upgrade/example',
  });

  // Assert
  expect(canAfford).toBe(true);
});
