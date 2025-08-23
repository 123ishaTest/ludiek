export interface BaseInputShape {
  type: string;
  amount: number;
}

export interface LudiekInput<Input extends BaseInputShape = BaseInputShape> {
  type: string;

  canLose(input: Input): boolean;
  lose(input: Input): void;
}

export type InputShape<Inputs extends readonly LudiekInput[]> = Inputs[number] extends LudiekInput<infer Input> ? Input : never;
