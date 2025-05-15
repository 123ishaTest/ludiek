export abstract class LudiekState<T> {
  protected abstract _state: T;

  public set(value: T): void {
    this._state = value;
  }

  public get(): T {
    return this._state;
  }

  public save(): T {
    return this._state;
  }

  public load(value: T): void {
    this._state = value;
  }
}
