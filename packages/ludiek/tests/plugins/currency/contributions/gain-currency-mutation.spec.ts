import { beforeEach, describe, expect, it } from 'vitest';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { GainCurrencyMutator } from '@ludiek/plugins/currency/contributions/GainCurrencyMutation';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';

const currency = new CurrencyPlugin();
const mutator = new GainCurrencyMutator();

new LudiekEngine({
  plugins: [currency],
  mutators: [mutator],
});

beforeEach(() => {
  currency.loadContent([{ id: '/currency/money' }, { id: '/currency/gems' }]);
});

describe('Currency Mutation', () => {
  it('checks if we can gain currency', () => {
    // Act
    const canApply = mutator.canApply();

    // Assert
    expect(canApply).toBe(true);
  });

  it('gains currency', () => {
    // Act
    mutator.apply({
      type: '/mutation/gain-currency',
      id: '/currency/money',
      amount: 6,
    });
    const money = currency.getBalance('/currency/money');

    // Assert
    expect(money).toBe(6);
  });
});
