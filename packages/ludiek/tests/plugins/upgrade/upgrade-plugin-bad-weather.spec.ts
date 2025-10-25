import { expect, it } from 'vitest';

import { UpgradePlugin } from '@ludiek/plugins/upgrade/UpgradePlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { UnknownLevelMismatchError, UnknownUpgradeError } from '@ludiek/plugins/upgrade/UpgradeErrors';

const upgrade = new UpgradePlugin();
new LudiekEngine({
  plugins: [upgrade],
});

it('throws an error when loading an invalid upgrade', () => {
  expect(() => {
    upgrade.loadContent([
      {
        id: '/upgrade/basic',
        bonusPerLevel: [{ type: '/bonus/basic', amount: +0.2 }],
        costPerLevel: [
          { type: '/input/example', amount: 1 },
          { type: '/input/example', amount: 2 },
        ],
        accumulateBonuses: false,
      },
    ]);
  }).toThrow(UnknownLevelMismatchError);
});

it('throws an error when accessing an unknown statistic ', () => {
  expect(() => upgrade.buyUpgrade('wrong')).toThrow(UnknownUpgradeError);
});
