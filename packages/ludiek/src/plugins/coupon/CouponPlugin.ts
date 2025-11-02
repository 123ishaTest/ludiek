import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { CouponPluginState, createCouponState } from '@ludiek/plugins/coupon/CouponPluginState';
import { hash } from '@ludiek/util/hash';
import { UnknownCouponError } from '@ludiek/plugins/coupon/CouponErrors';
import { CouponDefinition } from '@ludiek/plugins/coupon/CouponDefinition';
import { CouponRedeemed } from '@ludiek/plugins/coupon/CouponEvents';

export class CouponPlugin extends LudiekPlugin {
  readonly name = 'coupon';

  protected _state: CouponPluginState;

  private readonly _coupons: Record<string, CouponDefinition> = {};

  constructor(state: CouponPluginState = createCouponState()) {
    super();
    this._state = state;
  }

  public loadContent(coupons: CouponDefinition[]): void {
    coupons.forEach((coupon) => {
      this._coupons[coupon.id] = coupon;
      this._state.record[coupon.id] = false;
    });
  }

  public enterCoupon(guess: string): boolean {
    const hashValue = hash(guess);
    return Object.keys(this._coupons).some((id) => {
      return this.tryRedeemCoupon(id, hashValue);
    });
  }

  // TODO(@Isha): Convert to enum once responses are here
  private tryRedeemCoupon(id: string, hash: string): boolean {
    this.validate(id);

    if (this.hasRedeemedCoupon(id)) {
      return false;
    }

    const coupon = this._coupons[id];

    if (hash !== coupon.hash) {
      return false;
    }

    if (coupon.condition && !this.evaluate(coupon.condition)) {
      return false;
    }

    if (!this.canProduce(coupon.output)) {
      return false;
    }

    this.produce(coupon.output);

    this._state.record[id] = true;
    this._onCouponRedeemed.dispatch(coupon);
    return true;
  }

  /**
   * Return whether we have already redeemed the coupon
   * @param id
   */
  public hasRedeemedCoupon(id: string): boolean {
    this.validate(id);

    return this._state.record[id];
  }

  /**
   * Get a CouponDefinition
   * @param id
   */
  public getCoupon(id: string): CouponDefinition {
    this.validate(id);
    return this._coupons[id];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsCoupon(id)) {
      throw new UnknownCouponError(`Unknown coupon with id '${id}'`);
    }
  }

  /**
   * Whether the plugin supports this type of coupon
   * @param id
   */
  public supportsCoupon(id: string): boolean {
    return this._coupons[id] != undefined;
  }

  // Events
  protected _onCouponRedeemed = new SimpleEventDispatcher<CouponRedeemed>();

  /**
   * Emitted when a coupon is redeemed
   */
  public get onCouponRedeemed(): ISimpleEvent<CouponRedeemed> {
    return this._onCouponRedeemed.asEvent();
  }
}
