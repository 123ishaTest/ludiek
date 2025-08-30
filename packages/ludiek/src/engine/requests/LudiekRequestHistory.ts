import { BaseRequestShape, RequestEvent } from '@ludiek/engine/requests/LudiekRequest';

export class LudiekRequestHistory {
  private _events: RequestEvent[];

  constructor() {
    this._events = [];
  }

  public get events(): RequestEvent[] {
    return this._events;
  }

  public record(request: BaseRequestShape, timestamp = new Date()): void {
    this._events.push({
      timestamp: timestamp,
      request: request,
    });
  }

  public makeReactive(state: RequestEvent[]): void {
    this._events = state;
  }
}
