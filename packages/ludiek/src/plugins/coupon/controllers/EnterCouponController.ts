import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { BaseRequestShape, LudiekController } from '@ludiek/engine/requests/LudiekRequest';

export interface EnterCouponRequest extends BaseRequestShape {
  type: '/request/coupon/enter';
  coupon: string;
}

export class EnterCouponController implements LudiekController<EnterCouponRequest> {
  readonly type = '/request/coupon/enter';

  private readonly _coupon: CouponPlugin;

  constructor(coupon: CouponPlugin) {
    this._coupon = coupon;
  }

  resolve(request: EnterCouponRequest): void {
    this._coupon.enterCoupon(request.coupon);
  }
}
