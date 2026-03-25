import type { BaseCondition, BaseOutput } from '@123ishatest/ludiek';

export interface CouponDetail {
  id: string;
  hash: string;
  condition?: BaseCondition;
  output: BaseOutput;
}
