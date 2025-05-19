import type { NumberSettingDetail } from '#ludiek/features/settings/content/SettingDetail';
import { SettingState } from '#ludiek/features/settings/state/SettingState';

export class NumberSettingState extends SettingState<NumberSettingDetail> {
  constructor(detail: NumberSettingDetail) {
    super(detail);
  }

  public getLabel(): string {
    return this._state.toString();
  }
}
