import { expect, it } from 'vitest';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { EmptyController } from '@tests/shared/EmptyRequest';
import { ControllerNotFoundError } from '@ludiek/engine/request/RequestError';
import { EnterCouponController } from '@ludiek/plugins/coupon/contributions/EnterCouponRequest';

it('is type-safe', () => {
  // Arrange
  const engine = new LudiekEngine({
    controllers: [new EmptyController(), new EnterCouponController()],
  });

  // Valid
  engine.request({ type: '/request/empty' });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});

it('it collapses to never when no controllers', () => {
  // Arrange
  const engine = new LudiekEngine({
    controllers: [],
  });

  expect(() => {
    // @ts-expect-error unknown type
    engine.request({ type: 'wrong' });
  }).toThrow(ControllerNotFoundError);
});
