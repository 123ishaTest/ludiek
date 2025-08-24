import { PluginError } from '@ludiek/engine/LudiekError';

export abstract class CouponError extends PluginError {}

/**
 * Thrown when an unknown coupon is accessed.
 */
export class UnknownCouponError extends CouponError {}
