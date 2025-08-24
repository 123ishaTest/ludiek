export interface CouponPluginState {
  record: Record<string, boolean>;
}

export const createCouponState = (): CouponPluginState => {
  return {
    record: {},
  };
};
