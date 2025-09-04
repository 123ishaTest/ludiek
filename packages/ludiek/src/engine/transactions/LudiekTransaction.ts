import { BaseInputShape } from '@ludiek/engine/transactions/LudiekInput';
import { BaseOutputShape } from '@ludiek/engine/transactions/LudiekOutput';
import { BaseConditionShape } from '@ludiek/engine/conditions/LudiekCondition';

export interface LudiekTransaction<
  Input extends BaseInputShape,
  Output extends BaseOutputShape,
  Condition extends BaseConditionShape,
> {
  input?: Input | Input[];
  output?: Output | Output[];
  requirement?: Condition | Condition[];
}
