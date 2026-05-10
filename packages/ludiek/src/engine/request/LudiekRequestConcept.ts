import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';
import { LudiekController, LudiekRequest, LudiekResponse } from '@ludiek/engine/request/LudiekController';
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

  public resolve<Request extends LudiekRequest<Controllers>>(request: Request): LudiekResponse<Controllers, Request> {
    const controller = this.get(request.type);
    return controller.resolve(request) as LudiekResponse<Controllers, Request>;
  }
}
