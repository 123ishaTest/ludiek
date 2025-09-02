import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { BaseConditionShape } from '@ludiek/engine/LudiekCondition';
import { BaseOutputShape } from '@ludiek/engine/transactions/LudiekOutput';
import { createCouponState, CouponPluginState } from '@ludiek/plugins/coupon/CouponPluginState';
import { hash } from '@ludiek/util/hash';
import { UnknownCouponError } from '@ludiek/plugins/coupon/CouponErrors';
import { EnterCouponController } from '@ludiek/plugins/coupon/controllers/EnterCouponController';

export interface CouponDefinition {
  id: string;
  hash: string;
  output: BaseOutputShape | BaseOutputShape[];
  condition?: BaseConditionShape;
}

export class CouponPlugin extends LudiekPlugin {
  readonly name = 'coupon';
  public readonly config = {
    controllers: [],
    conditions: [],
    inputs: [],
    outputs: [],
  };
  protected _state: CouponPluginState;

  public readonly controllers = [new EnterCouponController(this)];

  private readonly _coupons: Record<string, CouponDefinition> = {};

  protected _onCouponRedeemed = new SimpleEventDispatcher<CouponDefinition>();

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

    if (!this.canGainOutput(coupon.output)) {
      return false;
    }

    this.gainOutput(coupon.output);

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

  /**
   * Emitted when an achievement is gained
   */
  public get onCouponRedeemed(): ISimpleEvent<CouponDefinition> {
    return this._onCouponRedeemed.asEvent();
  }
}
