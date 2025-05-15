import type { BooleanSettingDetail } from '@ludiek/features/settings/content/SettingDetail';
import { SettingState } from '@ludiek/features/settings/state/SettingState';

export class BooleanSettingState extends SettingState<BooleanSettingDetail> {
  constructor(detail: BooleanSettingDetail) {
    super(detail);
  }

  public getLabel(): string {
    return this.detail.options.find((option) => option.value === this._state)?.name ?? 'Unknown';
  }
}
