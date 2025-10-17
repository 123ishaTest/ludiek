import { beforeEach, expect, it, vi } from 'vitest';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { IsUpgradeMaxedEvaluator } from '@ludiek/plugins/upgrade/IsUpgradeMaxedCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const upgrade = new UpgradePlugin();
const evaluator = new IsUpgradeMaxedEvaluator();

const engine = new LudiekEngine({
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

it('evaluates to false when not maxed', () => {
  // Act
  const isMaxed = evaluator.evaluate({
    type: '/condition/is-upgrade-maxed',
    upgrade: '/upgrade/example',
  });

  // Assert
  expect(isMaxed).toBe(false);
});

it('evaluates to true when maxed', () => {
  // Arrange
  vi.spyOn(engine, 'canConsume').mockReturnValue(true);
  vi.spyOn(engine, 'consume').mockReturnValue();
  upgrade.buyUpgrade('/upgrade/example');

  // Act
  const isMaxed = evaluator.evaluate({
    type: '/condition/is-upgrade-maxed',
    upgrade: '/upgrade/example',
  });

  // Assert
  expect(isMaxed).toBe(true);
});
