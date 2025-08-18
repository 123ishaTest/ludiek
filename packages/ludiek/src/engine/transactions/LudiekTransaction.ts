import { InputShape, LudiekInput } from '@ludiek/engine/transactions/LudiekInput';
import { LudiekOutput, OutputShape } from '@ludiek/engine/transactions/LudiekOutput';
import { ConditionShape, LudiekCondition } from '@ludiek/engine/LudiekCondition';

export interface LudiekTransaction<
  Inputs extends LudiekInput[],
  Outputs extends LudiekOutput[],
  Conditions extends LudiekCondition[],
> {
  input?: InputShape<Inputs> | InputShape<Inputs>[];
  output?: OutputShape<Outputs> | OutputShape<Outputs>[];
  requirement?: ConditionShape<Conditions> | ConditionShape<Conditions>[];
}
