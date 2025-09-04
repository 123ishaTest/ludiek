import { beforeEach, expect, it } from 'vitest';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { AlwaysTrueCondition } from '@ludiek/engine/conditions/AlwaysTrueCondition';
import { AlwaysFalseCondition } from '@ludiek/engine/conditions/AlwaysFalseCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyOutput } from '@ludiek/plugins/currency/transactions/CurrencyOutput';
import { UnknownCouponError } from '@ludiek/plugins/coupon/CouponErrors';

const coupon = new CouponPlugin();
const currency = new CurrencyPlugin();
new LudiekEngine({
  conditions: [new AlwaysTrueCondition(), new AlwaysFalseCondition()],
  outputs: [new CurrencyOutput(currency)],
  plugins: [coupon],
});

const currencyContent = [{ id: 'money' }];
const couponContent = [
  {
    id: 'always-true',
    hash: 'gain-10-money',
    condition: {
      type: 'always-true',
    },
    output: {
      type: 'currency',
      id: 'money',
      amount: 10,
    },
  },
  {
    id: 'always-false',
    hash: '-1504921627',

    condition: {
      type: 'always-false',
    },
    output: {
      type: 'currency',
      id: 'money',
      amount: 1,
    },
  },
  {
    id: 'no-condition',
    hash: '-1693392881',
    output: {
      type: 'currency',
      id: 'money',
      amount: 5,
    },
  },
];

beforeEach(() => {
  currency.loadContent(currencyContent);
  coupon.loadContent(couponContent);
});

it('initializes at false', () => {
  // Act
  const alwaysTrue = coupon.hasRedeemedCoupon('always-true');
  const alwaysFalse = coupon.hasRedeemedCoupon('always-false');
  const noCondition = coupon.hasRedeemedCoupon('no-condition');

  // Assert
  expect(alwaysTrue).toBe(false);
  expect(alwaysFalse).toBe(false);
  expect(noCondition).toBe(false);
});

it('redeems coupons', () => {
  // Arrange
  expect.assertions(3);

  // Arrange
  const unsub = coupon.onCouponRedeemed.sub((c) => {
    expect(c.id).toBe('no-condition');
  });

  const guess = 'no-condition';

  // Act
  const success = coupon.enterCoupon(guess);
  const isRedeemed = coupon.hasRedeemedCoupon('no-condition');

  // Assert
  expect(success).toBe(true);
  expect(isRedeemed).toBe(true);

  // After
  unsub();
});

it('awards output when redeeming coupons', () => {
  // Arrange
  const guess = 'no-condition';

  // Act
  coupon.enterCoupon(guess);
  const money = currency.getBalance('money');

  // Assert
  expect(money).toBe(5);
});

it('ignores wrong coupons', () => {
  // Arrange
  const guess = 'wrong';

  // Act
  const success = coupon.enterCoupon(guess);
  const money = currency.getBalance('money');

  // Assert
  expect(success).toBe(false);
  expect(money).toBe(0);
});

it('checks for requirements', () => {
  // Arrange
  const guess = 'always-false';

  // Act
  const success = coupon.enterCoupon(guess);

  // Assert
  expect(success).toBe(false);
});

it('cannot earn checked coupons twice', () => {
  // Arrange
  const guess = 'no-condition';

  // Act
  const firstTry = coupon.enterCoupon(guess);
  const secondTry = coupon.enterCoupon(guess);

  // Assert
  expect(firstTry).toBe(true);
  expect(secondTry).toBe(false);
});

it('throws an error when accessing incorrect coupons', () => {
  // Act
  expect(() => {
    coupon.hasRedeemedCoupon('wrong');
  }).toThrow(UnknownCouponError);
});
