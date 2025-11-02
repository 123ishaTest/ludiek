import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { ISimpleEvent, SimpleEventDispatcher } from 'strongly-typed-events';
import { UnknownBuffError } from '@ludiek/plugins/buff/BuffErrors';
import { BuffPluginState, createBuffState } from '@ludiek/plugins/buff/BuffPluginState';
import { BuffDefinition } from '@ludiek/plugins/buff/BuffDefinition';
import { BuffExpired, BuffExtended, BuffActivated } from '@ludiek/plugins/buff/BuffEvents';
import { BonusContribution } from '@ludiek/engine/modifier/LudiekModifier';

export class BuffPlugin extends LudiekPlugin {
  readonly name = 'buff';
  protected _state: BuffPluginState;

  private readonly _buffs: Record<string, BuffDefinition> = {};

  constructor(state: BuffPluginState = createBuffState()) {
    super();
    this._state = state;
  }

  public loadContent(buffs: BuffDefinition[]): void {
    buffs.forEach((buff) => {
      this._buffs[buff.id] = buff;
      this._state.duration[buff.id] = 0;
    });
  }

  /**
   * Increase the duration of the buff
   * @param id
   * @param delta how much to increase the duration by
   */
  public increaseBuff(id: string, delta: number): void {
    this.validate(id);
    if (delta <= 0) {
      console.warn(`'increaseBuff' expects a positive delta. Ignoring value of ${delta}`);
      return;
    }

    const wasActive = this.isBuffActive(id);
    this._state.duration[id] += delta;

    if (wasActive) {
      this._onBuffExtended.dispatch({ ...this._buffs[id], duration: this.getDuration(id), delta: delta });
    } else {
      this._onBuffActivated.dispatch({ ...this._buffs[id], duration: delta });
    }
  }

  /**
   * Decrease the duration of the buff
   * @param id
   * @param delta how much to decrease the duration by
   */
  public decreaseBuff(id: string, delta: number = 1): void {
    this.validate(id);
    if (delta <= 0) {
      console.warn(`'increaseBuff' expects a positive delta. Ignoring delta of ${delta}`);
      return;
    }
    if (!this.isBuffActive(id)) {
      console.warn(`'Cannot decrease a buff when it is inactive. Ignoring value of ${delta}`);
    }

    this._state.duration[id] = Math.max(0, this._state.duration[id] - delta);
    const isActive = this.isBuffActive(id);

    if (!isActive) {
      this._onBuffExpired.dispatch(this._buffs[id]);
    }
  }

  /**
   * Set the buff to a fixed duration
   * @param id
   * @param duration
   */
  public setBuff(id: string, duration: number): void {
    const current = this.getDuration(id);
    const delta = duration - current;

    if (delta > 0) {
      this.increaseBuff(id, delta);
    } else {
      this.decreaseBuff(id, Math.abs(delta));
    }
  }

  getBonuses(): BonusContribution[] {
    return this.activeBuffs.flatMap((buff) => {
      return (
        buff.effects?.map((effect) => {
          return {
            ...effect,
            source: buff.id,
          };
        }) ?? []
      );
    });
  }

  public get activeBuffs(): BuffDefinition[] {
    return this.buffList.filter((buff) => this.isBuffActive(buff.id));
  }

  public get buffList(): BuffDefinition[] {
    return Object.values(this._buffs);
  }

  /**
   * Returns how much is left of this buff.
   * @param id
   */
  public getDuration(id: string): number {
    this.validate(id);
    return this._state.duration[id];
  }

  /**
   * Return whether the buff is active
   * @param id
   */
  public isBuffActive(id: string): boolean {
    this.validate(id);
    return this.getDuration(id) > 0;
  }

  /**
   * Get a BuffDefinition
   * @param id
   */
  public getBuff(id: string): BuffDefinition {
    this.validate(id);
    return this._buffs[id];
  }

  /**
   * Throws an error if the id does not exist
   * @param id
   * @private
   */
  private validate(id: string): void {
    if (!this.supportsBuff(id)) {
      throw new UnknownBuffError(`Unknown buff with id '${id}'`);
    }
  }

  /**
   * Whether the plugin supports this type of buff
   * @param id
   */
  public supportsBuff(id: string): boolean {
    return this._buffs[id] != undefined;
  }

  // Events
  protected _onBuffActivated = new SimpleEventDispatcher<BuffActivated>();
  protected _onBuffExtended = new SimpleEventDispatcher<BuffExtended>();
  protected _onBuffExpired = new SimpleEventDispatcher<BuffExpired>();

  /**
   * Emitted when a buff is activated
   */
  public get onBuffActivated(): ISimpleEvent<BuffActivated> {
    return this._onBuffActivated.asEvent();
  }

  /**
   * Emitted when a buff is extended
   */
  public get onBuffExtended(): ISimpleEvent<BuffExtended> {
    return this._onBuffExtended.asEvent();
  }

  /**
   * Emitted when a buff is expired
   */
  public get onBuffExpired(): ISimpleEvent<BuffExpired> {
    return this._onBuffExpired.asEvent();
  }
}
