import { z } from 'zod';
import { CouponPlugin } from '@ludiek/plugins/coupon/CouponPlugin';
import { LudiekController } from '@ludiek/engine/request/LudiekRequest';

export const EnterCouponRequestSchema = z.strictObject({
  type: z.literal('/request/enter-coupon'),
  coupon: z.string(),
});

export type EnterCouponRequest = z.infer<typeof EnterCouponRequestSchema>;

type Dependencies = {
  plugins: [CouponPlugin];
};

export class EnterCouponController extends LudiekController<EnterCouponRequest, Dependencies> {
  readonly schema = EnterCouponRequestSchema;

  resolve(request: EnterCouponRequest): void {
    this.engine.plugins.coupon.enterCoupon(request.coupon);
  }
}
