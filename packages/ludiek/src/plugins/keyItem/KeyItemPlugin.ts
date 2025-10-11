import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { UnknownKeyItemError } from '@ludiek/plugins/keyItem/KeyItemErrors';
import { createKeyItemState, KeyItemPluginState } from '@ludiek/plugins/keyItem/KeyItemPluginState';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

export interface KeyItemDefinition {
  id: string;

  /**
   * Optional modifiers when this KeyItem is unlocked
   */
  rewards?: Omit<BonusContribution, 'source'>[];
}

export class KeyItemPlugin extends LudiekPlugin {
  readonly name = 'keyItem';

  protected _state: KeyItemPluginState;

  private readonly _keyItems: Record<string, KeyItemDefinition> = {};

  protected _onKeyItemEarn = new SimpleEventDispatcher<KeyItemDefinition>();

  constructor(state: KeyItemPluginState = createKeyItemState()) {
    super();
    this._state = state;
  }

  public loadContent(keyItems: KeyItemDefinition[]): void {
    keyItems.forEach((keyItem) => {
      this._keyItems[keyItem.id] = keyItem;
      this._state.record[keyItem.id] = false;
    });
  }

  /**
   * Earns the keyItem
   * @param id
   */
  public gainKeyItem(id: string): void {
    this.validate(id);

    if (this.hasKeyItem(id)) {
      return;
    }

    this._state.record[id] = true;
    this._onKeyItemEarn.dispatch(this._keyItems[id]);
  }

  getBonuses(): BonusContribution[] {
    return this.earnedKeyItems.flatMap((keyItem) => {
      return (
        keyItem.rewards?.map((reward) => {
          return {
            ...reward,
            source: keyItem.id,
          };
        }) ?? []
      );
    });
  }

  /**
   * Return whether we have earned the keyItem
   * @param id
   */
  public hasKeyItem(id: string): boolean {
    this.validate(id);

    return this._state.record[id];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsKeyItem(id)) {
      throw new UnknownKeyItemError(`Unknown keyItem with id '${id}'`);
    }
  }

  /**
   * Whether the plugin supports this type of keyItem
   * @param id
   */
  public supportsKeyItem(id: string): boolean {
    return this._keyItems[id] != undefined;
  }

  /**
   * Emitted when an keyItem is gained
   */
  public get onKeyItemEarn(): ISimpleEvent<KeyItemDefinition> {
    return this._onKeyItemEarn.asEvent();
  }

  public get earnedKeyItems(): KeyItemDefinition[] {
    return this.keyItemList.filter((item) => this.hasKeyItem(item.id));
  }

  public get keyItemList(): KeyItemDefinition[] {
    return Object.values(this._keyItems);
  }
}
