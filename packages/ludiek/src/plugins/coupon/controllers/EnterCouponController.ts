import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';

export interface EnterCouponRequest extends BaseRequestShape {
  type: '/request/coupon/enter';
  coupon: string;
}

export class EnterCouponController implements LudiekController<EnterCouponRequest> {
  type: string = '/request/coupon/enter';

  private readonly _coupon: CouponPlugin;

  constructor(coupon: CouponPlugin) {
    this._coupon = coupon;
  }

  resolve(request: EnterCouponRequest): void {
    this._coupon.enterCoupon(request.coupon);
  }
}
