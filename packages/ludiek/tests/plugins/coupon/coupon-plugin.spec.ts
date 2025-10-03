import { beforeEach, expect, it } from 'vitest';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { TrueEvaluator } from '@ludiek/stdlib/condition/TrueCondition';
import { FalseEvaluator } from '@ludiek/stdlib/condition/FalseCondition';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
import { CurrencyProducer } from '@ludiek/plugins/currency/CurrencyOutput';
import { UnknownCouponError } from '@ludiek/plugins/coupon/CouponErrors';

const coupon = new CouponPlugin();
const currency = new CurrencyPlugin();
new LudiekEngine({
  plugins: [coupon, currency],
  evaluators: [new TrueEvaluator(), new FalseEvaluator()],
  producers: [new CurrencyProducer()],
});

const currencyContent = [{ id: '/currency/money' }];
const couponContent = [
  {
    id: 'always-true',
    hash: 'gain-10-money',
    condition: {
      type: '/condition/true',
    },
    output: {
      type: '/output/currency',
      id: '/currency/money',
      amount: 10,
    },
  },
  {
    id: 'always-false',
    hash: '-1504921627',

    condition: {
      type: '/condition/false',
    },
    output: {
      type: '/output/currency',
      id: '/currency/money',
      amount: 1,
    },
  },
  {
    id: 'no-condition',
    hash: '-1693392881',
    output: {
      type: '/output/currency',
      id: '/currency/money',
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
  const money = currency.getBalance('/currency/money');

  // Assert
  expect(money).toBe(5);
});

it('ignores wrong coupons', () => {
  // Arrange
  const guess = 'wrong';

  // Act
  const success = coupon.enterCoupon(guess);
  const money = currency.getBalance('/currency/money');

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
