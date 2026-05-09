import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekController, LudiekRequest } from '@ludiek/engine/request/LudiekController';
import { RequestNotFoundError } from '@ludiek/engine/request/RequestError';

export class LudiekRequestConcept<const Controllers extends readonly LudiekController[]> extends LudiekEngineConcept<
  LudiekController,
  Controllers
> {
  public raiseNotfoundError(type: string, registeredContributions: string[]): never {
    throw new RequestNotFoundError(
      `Cannot produce request of type '${type}' because its controller is not registered. Registered controllers are: ${registeredContributions.join(', ')}`,
    );
  }

  public resolve(request: LudiekRequest<Controllers>): void {
    const controller = this.get(request.type);
    controller.resolve(request);
  }
}
