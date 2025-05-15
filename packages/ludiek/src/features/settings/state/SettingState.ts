import { type ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import type { SettingId } from '@ludiek/features/settings/content/SettingId';
import type { SettingDetail, SettingValue } from '@ludiek/features/settings/content/SettingDetail';
import { LudiekState } from '@ludiek/tools/state/LudiekState';

export interface SettingChangedEvent {
  id: SettingId;
  old: SettingValue;
  new: SettingValue;
}

export abstract class SettingState<T extends SettingDetail = SettingDetail> extends LudiekState<SettingValue> {
  detail: T;
  _state: SettingValue = false;

  protected constructor(detail: T) {
    super();
    this.detail = detail;
    this._state = detail.default;
  }

  private _onChange = new SimpleEventDispatcher<SettingChangedEvent>();

  /**
   * Emitted whenever a setting is changed
   */
  public get onChange(): ISimpleEvent<SettingChangedEvent> {
    return this._onChange.asEvent();
  }

  public abstract getLabel(): string;

  public get(): SettingValue {
    return this._state;
  }

  public set(value: SettingValue): void {
    const oldValue = this._state;

    // TODO(@Isha): Check for options if value is valid
    this._state = value;
    this._onChange.dispatch({
      id: this.id,
      old: oldValue,
      new: value,
    });
  }

  public get id(): SettingId {
    return this.detail.id;
  }
}
