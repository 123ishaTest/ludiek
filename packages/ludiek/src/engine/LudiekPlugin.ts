import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekDependencies } from './LudiekEngineContribution';

/**
 * Extend to create your own custom plugin
 */
export abstract class LudiekPlugin<
  Dependencies extends LudiekDependencies = LudiekDependencies,
> extends LudiekElement<Dependencies> {
  public abstract loadContent(content: { id: string }[]): void;
}
