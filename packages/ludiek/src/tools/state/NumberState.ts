import { LudiekState } from '@ludiek/tools/state/LudiekState';

export class NumberState extends LudiekState<number> {
  _state: number = 0;

  constructor() {
    super();
  }

  public get(): number {
    return this._state;
  }

  public set(amount: number): void {
    this._state = amount;
  }

  public add(amount: number): void {
    this._state += amount;
  }

  public subtract(amount: number): void {
    this._state -= amount;
  }
}
