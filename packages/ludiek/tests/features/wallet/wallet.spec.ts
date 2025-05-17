import { assert, beforeEach, describe, expect, it } from 'vitest';
import type { CurrencyType } from '@ludiek/features/wallet/content/CurrencyType';
import type { CurrencyDetail } from '@ludiek/features/wallet/content/CurrencyDetail';
import { Wallet } from '@ludiek/features/wallet/Wallet';
import type { Features } from '@ludiek/features/Features';
import { Engine } from '@ludiek/engine/Engine';
import type { Content } from '@ludiek/content/Content';
import { InvalidCurrencyError } from '@ludiek/features/wallet/WalletErrors';

describe('Wallet', () => {
  const money: CurrencyType = 'money';
  const secondary: CurrencyType = 'secondary';
  const wrongType: CurrencyType = 'wrong';
  const currencyDetails: CurrencyDetail[] = [
    {
      name: money,
      id: money,
      icon: '',
    },
    {
      name: secondary,
      id: secondary,
      icon: '',
    },
  ];
  let wallet: Wallet;

  beforeEach(() => {
    // TODO(@Isha): properly setup tests as features now need an engine
    wallet = new Wallet();
    wallet._inject({} as Features, new Engine(), { currencies: currencyDetails } as Content);
    wallet.initialize();
  });

  it('follows a sensible happy flow', () => {
    wallet.gainCurrency({ amount: 10, type: money });

    expect(wallet.getAmount(money)).toBe(10);

    wallet.gainCurrency({ amount: 20, type: money });
    expect(wallet.getAmount(money)).toBe(30);

    const couldAfford31 = wallet.pay({ amount: 31, type: money });
    expect(couldAfford31).toBe(false);

    const couldAfford25 = wallet.pay({ amount: 25, type: money });
    expect(couldAfford25).toBe(true);

    expect(wallet.getAmount(money)).toBe(5);
  });

  it('instantiates with 0 as the default amount', () => {
    expect(wallet.getAmount(money)).toBe(0);
  });

  it('checks for supported currencies', () => {
    // Act
    const supportsMoney = wallet.supportsCurrencyType(money);
    const supportsWrong = wallet.supportsCurrencyType(wrongType);

    // Assert
    expect(supportsMoney).toBe(true);
    expect(supportsWrong).toBe(false);
  });

  it('can gain money', () => {
    // Act
    wallet.gainCurrency({ amount: 1, type: 'money' });
    const actualMoney = wallet.getAmount(money);

    // Assert
    expect(actualMoney).toBe(1);
  });

  it('can gain multiple of the same currencies', () => {
    // Act
    wallet.gainCurrencies([
      { amount: 1, type: money },
      { amount: 2, type: money },
    ]);
    const actualMoney = wallet.getAmount(money);

    // Assert
    expect(actualMoney).toBe(3);
  });

  it('can gain multiple different currencies', () => {
    // Act
    wallet.gainCurrencies([
      { amount: 1, type: money },
      { amount: 2, type: secondary },
    ]);
    const actualMoney = wallet.getAmount(money);
    const actualSecondary = wallet.getAmount(secondary);

    // Assert
    expect(actualMoney).toBe(1);
    expect(actualSecondary).toBe(2);
  });

  it('checks correctly whether you have currencies', () => {
    // Arrange
    wallet.gainCurrency({ amount: 10, type: money });

    // Act
    const has10 = wallet.hasCurrency({ amount: 10, type: money });
    const has11 = wallet.hasCurrency({ amount: 11, type: money });

    // Assert
    expect(has10).toBe(true);
    expect(has11).toBe(false);
  });

  it('throws an exception when gaining negative amounts', () => {
    assert.throws(() => {
      wallet.gainCurrency({ amount: -1, type: money });
    }, InvalidCurrencyError);
  });

  it('prevents gaining an unknown currency', () => {
    // Act
    assert.throws(() => {
      wallet.gainCurrency({ amount: 1, type: wrongType });
    }, InvalidCurrencyError);
  });

  it('prevents gaining NaN of a currency', () => {
    // Act
    assert.throws(() => {
      wallet.gainCurrency({ amount: NaN, type: money });
    }, InvalidCurrencyError);
  });

  it('loses currency correctly', () => {
    // Arrange
    wallet.gainCurrency({ amount: 10, type: money });

    // Act
    wallet.loseCurrency({ amount: 4, type: money });

    // Assert
    expect(wallet.getAmount(money)).toBe(6);
  });

  it('cannot lose invalid currency', () => {
    assert.throws(() => {
      wallet.loseCurrency({ amount: -1, type: money });
    }, InvalidCurrencyError);
  });

  it('handles payments if you have enough currency', () => {
    // Arrange
    wallet.gainCurrency({ amount: 10, type: money });

    // Act
    const paid = wallet.pay({ amount: 4, type: money });

    // Assert
    expect(wallet.getAmount(money)).toBe(6);
    expect(paid).toBe(true);
  });

  it('handles payments if you don\t have enough currency', () => {
    // Arrange
    wallet.gainCurrency({ amount: 10, type: money });

    // Act
    const paid = wallet.pay({ amount: 15, type: money });

    // Assert
    expect(wallet.getAmount(money)).toBe(10);
    expect(paid).toBeFalsy();
  });

  it('has 0 of an incorrect currency', () => {
    // Assert
    expect(wallet.getAmount(wrongType)).toBe(0);
  });

  it('does not have any amount of incorrect currency', () => {
    // Assert
    expect(wallet.hasCurrency({ amount: 0, type: wrongType })).toBe(false);
  });

  // TODO(@Isha): Fix saving and loading
  it.skip('saves correctly', () => {
    // Arrange
    const expectedSaveData = {
      currencies: {
        money: 10,
        secondary: 8,
      },
    };

    // Act
    wallet.gainCurrency({ amount: 10, type: money });
    wallet.gainCurrency({ amount: 8, type: secondary });
    const actualSaveData = wallet.save();

    // Assert
    expect(actualSaveData).toEqual(expectedSaveData);
  });

  it.skip('loads correctly', () => {
    // Arrange
    const saveData = {
      currencies: {
        money: 10,
        secondary: 8,
      },
    };

    // Act
    wallet.load(saveData);

    // Assert
    expect(wallet.getAmount(money)).toEqual(10);
    expect(wallet.getAmount(secondary)).toEqual(8);
  });

  it("load empty data doesn't break stuff", () => {
    // Act
    wallet.load({});

    // Assert
    expect(wallet.getAmount(money)).toEqual(0);
    expect(wallet.getAmount(secondary)).toEqual(0);
  });

  it('sends events on currency gain', () => {
    // Arrange
    expect.assertions(2);

    wallet.onCurrencyGain.subscribe((currency) => {
      expect(currency.amount).toBe(10);
      expect(currency.type).toBe(money);
    });

    // Act
    wallet.gainCurrency({ amount: 10, type: money });
  });
});
