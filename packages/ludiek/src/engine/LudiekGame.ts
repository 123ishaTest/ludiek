import { ISignal, SignalDispatcher } from 'strongly-typed-events';
import { LudiekSaveData } from '@ludiek/engine/peristence/LudiekSaveData';
import { LudiekLocalStorage } from '@ludiek/engine/peristence/LudiekLocalStorage';
import { LudiekJsonSaveEncoder } from '@ludiek/engine/peristence/LudiekJsonSaveEncoder';
import { LudiekGameConfig } from '@ludiek/engine/LudiekGameConfig';
import { DependencyEngine, LudiekDependencies } from '@ludiek/engine/LudiekEngineConcept';

export class LudiekGame<Engine extends DependencyEngine<LudiekDependencies>> {
  private readonly _engine: Engine;
  public readonly config: LudiekGameConfig;
  protected saveEncoder = new LudiekJsonSaveEncoder();
  protected _tickInterval: ReturnType<typeof setTimeout> | null = null;

  private _onTick = new SignalDispatcher();

  protected _nextSave: number;

  constructor(engine: Engine, config: LudiekGameConfig) {
    this._engine = engine;
    this.config = config;

    this._nextSave = this.config.saveInterval;
  }

  public start(): void {
    // TODO(@Isha): Improve game loop
    this.stop();
    this._tickInterval = setInterval(() => {
      this.tick(this.config.tickDuration);
    }, this.config.tickDuration * 1000);
  }

  // TODO(@Isha): Improve state management
  public stop(): void {
    if (this._tickInterval) {
      clearInterval(this._tickInterval);
    }
  }

  public tick(delta: number): void {
    this.engine.preTick();
    this.engine.tick(delta);

    this._nextSave -= delta;
    if (this._nextSave <= 0) {
      const data = this.save();
      LudiekLocalStorage.store(this.config.saveKey, data, this.saveEncoder);

      this._nextSave = this.config.saveInterval;
    }

    this._onTick.dispatch();
  }

  public get engine(): Engine {
    return this._engine;
  }

  public save(): LudiekSaveData {
    return {
      engine: this._engine.save(),
      game: {},
    };
  }

  public loadFromStorage(): void {
    const data = LudiekLocalStorage.get(this.config.saveKey, this.saveEncoder);
    this.load(data);
  }

  public load(saveData: LudiekSaveData): void {
    if (saveData == null) {
      return;
    }
    this._engine.load(saveData.engine);
    // TODO(@Isha): Load game when needed
  }

  /**
   * Emitted when a tick happens
   */
  public get onTick(): ISignal {
    return this._onTick.asEvent();
  }
}
