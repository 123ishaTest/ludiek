import type { CurrencyDetail } from '#ludiek/features/wallet/content/CurrencyDetail';
import { NumberState } from '#ludiek/tools/state/NumberState';

export class CurrencyState extends NumberState {
  detail: CurrencyDetail;

  constructor(detail: CurrencyDetail) {
    super();
    this.detail = detail;
  }

  public has(amount: number): boolean {
    return this._state >= amount;
  }
}
