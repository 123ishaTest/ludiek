import { beforeEach, expect, it, MockInstance, vi } from 'vitest';
import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { UpgradeDefinition } from '@ludiek/plugins/upgrade/UpgradeDefinition';

const upgrade = new UpgradePlugin();
const engine = new LudiekEngine({
  plugins: [upgrade],
});

const upgradeContent: UpgradeDefinition[] = [
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
  {
    id: '/upgrade/accumulated',
    bonusPerLevel: [
      { type: '/bonus/example', amount: +0.4 },
      { type: '/bonus/example', amount: +0.4 },
      { type: '/bonus/example', amount: +0.4 },
    ],
    costPerLevel: [
      { type: '/input/example', amount: 1 },
      { type: '/input/example', amount: 2 },
      { type: '/input/example', amount: 3 },
    ],
    accumulateBonuses: true,
  },
];

let canConsumeSpy: MockInstance;
let consumeSpy: MockInstance;

beforeEach(() => {
  vi.resetAllMocks();
  canConsumeSpy = vi.spyOn(engine, 'canConsume').mockReturnValue(true);
  consumeSpy = vi.spyOn(engine, 'consume').mockReturnValue();

  upgrade.loadContent(upgradeContent);
});

it('initializes at level 0', () => {
  // Act
  const basicLevel = upgrade.getLevel('/upgrade/basic');
  const accumulatedLevel = upgrade.getLevel('/upgrade/accumulated');

  // Assert
  expect(basicLevel).toBe(0);
  expect(accumulatedLevel).toBe(0);
});

it('provides no bonuses at level 0', () => {
  // Act
  const bonuses = upgrade.getBonuses();

  // Assert
  expect(bonuses).toHaveLength(0);
});

it('calculates bonuses at higher levels', () => {
  // Arrange
  upgrade.buyUpgrade('/upgrade/basic');
  upgrade.buyUpgrade('/upgrade/basic');

  // Act
  const bonuses = upgrade.getBonuses();

  // Assert
  expect(bonuses).toEqual([{ type: '/bonus/basic', amount: +0.2 }]);
});

it('accumulates bonuses at higher levels', () => {
  // Arrange
  upgrade.buyUpgrade('/upgrade/accumulated');
  upgrade.buyUpgrade('/upgrade/accumulated');

  // Act
  const bonuses = upgrade.getBonuses();

  // Assert
  expect(bonuses).toEqual([
    { type: '/bonus/example', amount: +0.4 },
    { type: '/bonus/example', amount: +0.4 },
  ]);
});

it('calculates costs at level 0', () => {
  // Act
  const exampleCost = upgrade.getCost('/upgrade/basic');

  // Assert
  expect(exampleCost).toEqual({ type: '/input/example', amount: 1 });
});

it('calculates costs at higher levels', () => {
  // Arrange
  upgrade.buyUpgrade('/upgrade/basic');

  // Act
  const cost = upgrade.getCost('/upgrade/basic');

  // Assert
  expect(cost).toEqual({ type: '/input/example', amount: 2 });
});

it('can buy upgrades', () => {
  // Arrange
  const cost = upgrade.getCost('/upgrade/basic');

  // Act
  upgrade.buyUpgrade('/upgrade/basic');
  const newLevel = upgrade.getLevel('/upgrade/basic');

  // Assert
  expect(canConsumeSpy).toHaveBeenCalledExactlyOnceWith(cost);
  expect(consumeSpy).toHaveBeenCalledExactlyOnceWith(cost);
  expect(newLevel).toBe(1);
});

it('does not increase if we cannot buy', () => {
  // Arrange
  vi.spyOn(upgrade, 'canBuyUpgrade').mockReturnValue(false);

  // Act
  upgrade.buyUpgrade('/upgrade/basic');
  const newLevel = upgrade.getLevel('/upgrade/basic');

  // Assert
  expect(newLevel).toBe(0);
});

it('gets the max level', () => {
  // Act
  const basicMaxLevel = upgrade.getMaxLevel('/upgrade/basic');
  const accumulatedMaxLevel = upgrade.getMaxLevel('/upgrade/accumulated');

  // Assert
  expect(basicMaxLevel).toBe(2);
  expect(accumulatedMaxLevel).toBe(3);
});

it('knows when an upgrade is at max level', () => {
  // Arrange
  upgrade.buyUpgrade('/upgrade/basic');

  // Act
  const isMaxLevelBefore = upgrade.isMaxLevel('/upgrade/basic');
  upgrade.buyUpgrade('/upgrade/basic');

  const isMaxLevelAfter = upgrade.isMaxLevel('/upgrade/basic');
  // Assert

  expect(isMaxLevelBefore).toBe(false);
  expect(isMaxLevelAfter).toBe(true);
});

it('does not buy when at max level', () => {
  // Arrange
  upgrade.buyUpgrade('/upgrade/basic');
  upgrade.buyUpgrade('/upgrade/basic');
  expect(upgrade.isMaxLevel('/upgrade/basic')).toBe(true);

  // Act
  upgrade.buyUpgrade('/upgrade/basic');
  const isMaxLevel = upgrade.isMaxLevel('/upgrade/basic');

  // Assert
  expect(isMaxLevel).toBe(true);
});
