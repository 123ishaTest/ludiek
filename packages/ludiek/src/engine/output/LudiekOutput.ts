import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

export interface BaseOutputShape {
  type: string;
  amount: number;
}

export abstract class LudiekOutput<Output extends BaseOutputShape = BaseOutputShape> extends LudiekEngineConcept {
  public abstract readonly type: Output['type'];

  /**
   * Whether this output can be gained
   * @param output
   */
  public abstract canGain(output: Output): boolean;

  /**
   * Applying the output
   * @param output
   */
  public abstract gain(output: Output): void;
}
