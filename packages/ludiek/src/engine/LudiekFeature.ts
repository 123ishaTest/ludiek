import { LudiekElement } from '@ludiek/engine/LudiekElement';
import { LudiekDependencies } from '@ludiek/engine/LudiekEngineConcept';

export abstract class LudiekFeature<
  Dependencies extends LudiekDependencies = object,
> extends LudiekElement<Dependencies> {
  /**
   * Called every tick
   * @param delta how much time has passed in seconds
   */
  update?(delta: number): void;
}
