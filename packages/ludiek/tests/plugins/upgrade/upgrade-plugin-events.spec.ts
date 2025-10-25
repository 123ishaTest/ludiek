import { beforeEach, expect, it, vi } from 'vitest';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const upgrade = new UpgradePlugin();
const engine = new LudiekEngine({
  plugins: [upgrade],
});

const upgrades = [
  {
    id: '/upgrade/basic',
    bonusPerLevel: [
      { type: '/bonus/basic', amount: +0.1 },
      { type: '/bonus/basic', amount: +0.2 },
    ],
    costPerLevel: [
      { type: '/input/example', amount: 1 },
      { type: '/input/example', amount: 2 },
    ],
    accumulateBonuses: false,
  },
];
beforeEach(() => {
  upgrade.loadContent(upgrades);
});

it('emits an event when an upgrade is bought', () => {
  // Arrange
  expect.assertions(1);
  vi.spyOn(engine, 'canConsume').mockReturnValue(true);
  vi.spyOn(engine, 'consume').mockReturnValue();

  const unsub = upgrade.onUpgradeBought.sub((u) => {
    expect(u.id).toBe('/upgrade/basic');
  });

  // Act
  upgrade.buyUpgrade('/upgrade/basic');

  // After
  unsub();
});

it('does not emit an event we cannot buy an upgrade', () => {
  // Arrange
  vi.spyOn(upgrade, 'canBuyUpgrade').mockReturnValue(false);

  const unsub = upgrade.onUpgradeBought.sub((u) => {
    expect.fail(`Buying of upgrade '${u.id}' should not have succeeded`);
  });

  // Act
  upgrade.buyUpgrade('/upgrade/basic');

  // After
  unsub();
});
