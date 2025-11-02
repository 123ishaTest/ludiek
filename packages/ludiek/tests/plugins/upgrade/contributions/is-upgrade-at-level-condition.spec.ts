import { beforeEach, expect, it, vi } from 'vitest';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { IsUpgradeAtLevelEvaluator } from '@ludiek/plugins/upgrade/contributions/IsUpgradeAtLevelCondition';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const upgrade = new UpgradePlugin();
const evaluator = new IsUpgradeAtLevelEvaluator();

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

it('evaluates when at level 0', () => {
  // Act
  const isAt0 = evaluator.evaluate({
    type: '/condition/is-upgrade-at-level',
    upgrade: '/upgrade/example',
    level: 0,
  });
  const isAt1 = evaluator.evaluate({
    type: '/condition/is-upgrade-at-level',
    upgrade: '/upgrade/example',
    level: 1,
  });

  // Assert
  expect(isAt0).toBe(true);
  expect(isAt1).toBe(false);
});

it('evaluates to true when atLevel', () => {
  // Arrange
  vi.spyOn(engine, 'canConsume').mockReturnValue(true);
  vi.spyOn(engine, 'consume').mockReturnValue();
  upgrade.buyUpgrade('/upgrade/example');

  // Act
  const isAt0 = evaluator.evaluate({
    type: '/condition/is-upgrade-at-level',
    upgrade: '/upgrade/example',
    level: 0,
  });
  const isAt1 = evaluator.evaluate({
    type: '/condition/is-upgrade-at-level',
    upgrade: '/upgrade/example',
    level: 1,
  });
  const isAt2 = evaluator.evaluate({
    type: '/condition/is-upgrade-at-level',
    upgrade: '/upgrade/example',
    level: 2,
  });

  // Assert
  expect(isAt0).toBe(true);
  expect(isAt1).toBe(true);
  expect(isAt2).toBe(false);
});
