import { Feature } from '@ludiek/features/Feature';
import type { SettingId } from '@ludiek/features/settings/content/SettingId';
import type { SettingState } from '@ludiek/features/settings/state/SettingState';
import { SettingValueRequirementDefinition } from '@ludiek/features/settings/requirements/SettingValueRequirement';
import { SettingEnabledRequirementDefinition } from '@ludiek/features/settings/requirements/SettingEnabledRequirement';
import { type SettingDetail, SettingSchema, type SettingValue } from '@ludiek/features/settings/content/SettingDetail';
import { BooleanSettingState } from '@ludiek/features/settings/state/BooleanSettingState';
import { NumberSettingState } from '@ludiek/features/settings/state/NumberSettingState';

export class Settings extends Feature {
  protected _state: {
    settings: Record<SettingId, SettingState>;
  } = {
    settings: {},
  };

  constructor() {
    super('settings');
  }

  public configure(): void {
    this._engine.requirements.register(new SettingValueRequirementDefinition());
    this._engine.requirements.register(new SettingEnabledRequirementDefinition());
  }

  public content(): void {
    this._engine.addContent('setting', SettingSchema);
  }

  initialize() {
    // Set all settings to their default value
    this.settingDetails.forEach((setting) => {
      switch (setting.type) {
        case 'boolean':
          this._state.settings[setting.id] = new BooleanSettingState(setting);
          break;
        case 'number':
          this._state.settings[setting.id] = new NumberSettingState(setting);
          break;
      }
    });
  }

  public set(id: SettingId, value: SettingValue): void {
    this._state.settings[id].set(value);
  }

  public get(id: SettingId): SettingValue {
    return this._state.settings[id].get();
  }

  public getState<T>(id: SettingId): T {
    return this._state.settings[id] as T;
  }

  public get settingDetails(): SettingDetail[] {
    return this._content.settings;
  }
}
