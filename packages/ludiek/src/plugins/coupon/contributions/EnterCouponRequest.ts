import { z } from 'zod';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { LudiekController } from '@ludiek/engine/request/LudiekController';

export const EnterCouponRequestSchema = z.strictObject({
  type: z.literal('/request/enter-coupon'),
  coupon: z.string(),
});

export type EnterCouponRequest = z.infer<typeof EnterCouponRequestSchema>;

export type EnterCouponResponse = {
  response: string;
};

type Dependencies = {
  plugins: [CouponPlugin];
};
export class EnterCouponController extends LudiekController<EnterCouponRequest, EnterCouponResponse, Dependencies> {
  readonly schema = EnterCouponRequestSchema;

  resolve(request: EnterCouponRequest) {
    const success = this.engine.plugins.coupon.enterCoupon(request.coupon);
    return this.response(success, {
      response: request.coupon,
    });
  }
}
