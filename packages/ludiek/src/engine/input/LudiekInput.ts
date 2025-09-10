import { LudiekEngineConcept } from '@ludiek/engine/LudiekEngineConcept';

export interface BaseInputShape {
  type: string;
  amount: number;
}

export abstract class LudiekInput<Input extends BaseInputShape = BaseInputShape> extends LudiekEngineConcept {
  public abstract readonly type: Input['type'];

  /**
   * Whether we can lose the input (i.e. have it)
   * @param input
   */
  abstract canLose(input: Input): boolean;

  /**
   * Subtracting the input
   * @param input
   */
  abstract lose(input: Input): void;
}
