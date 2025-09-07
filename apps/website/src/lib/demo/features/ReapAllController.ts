import type { BaseRequestShape, LudiekController } from '@123ishatest/ludiek';
import type { Farming } from '$lib/demo/features/Farming.svelte';

export interface ReapAllRequest extends BaseRequestShape {
  type: '/farming/reap-all';
}

export class ReapAllController implements LudiekController<ReapAllRequest> {
  readonly type: string = '/farming/reap-all';

  private readonly _farming: Farming;

  constructor(farming: Farming) {
    this._farming = farming;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resolve(request: ReapAllRequest): void {
    for (let i = 0; i < this._farming.FARM_PLOTS; i++) {
      this._farming.reap(i);
    }
  }
}
