import { BaseInputShape } from '@ludiek/engine/input/LudiekInput';
import { BaseOutputShape } from '@ludiek/engine/output/LudiekOutput';
import { BaseConditionShape } from '@ludiek/engine/condition/LudiekCondition';

export interface LudiekTransaction<
  Input extends BaseInputShape,
  Output extends BaseOutputShape,
  Condition extends BaseConditionShape,
> {
  input?: Input | Input[];
  output?: Output | Output[];
  requirement?: Condition | Condition[];
}
