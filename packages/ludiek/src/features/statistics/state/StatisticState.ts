import { NumberState } from '@ludiek/tools/state/NumberState';
import type { StatisticDetail } from '@ludiek/features/statistics/content/StatisticDetail';

export class StatisticState extends NumberState {
  detail: StatisticDetail;

  constructor(detail: StatisticDetail) {
    super();
    this.detail = detail;
  }
}
