import type { Condition, Output } from '$lib/demo/demo.svelte';

export interface CouponDetail {
  id: string;
  hash: string;
  condition?: Condition;
  output: Output;
}
