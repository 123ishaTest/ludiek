export interface BaseOutputShape {
  type: string;
  amount: number;
}

export interface LudiekOutput<Output extends BaseOutputShape = BaseOutputShape> {
  type: string;

  canGain(output: Output): boolean;
  gain(output: Output): void;
}
