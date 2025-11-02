import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { BaseRequest, LudiekController } from '@ludiek/engine/request/LudiekRequest';

export interface EnterCouponRequest extends BaseRequest {
  type: '/request/enter-coupon';
  coupon: string;
}

type Dependencies = {
  plugins: [CouponPlugin];
};

export class EnterCouponController extends LudiekController<EnterCouponRequest, Dependencies> {
  readonly type = '/request/enter-coupon';

  resolve(request: EnterCouponRequest): void {
    this.engine.plugins.coupon.enterCoupon(request.coupon);
  }
}
