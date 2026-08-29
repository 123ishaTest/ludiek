import { BaseInput } from '@ludiek/engine/input/LudiekConsumer';
import { BaseOutput } from '@ludiek/engine/mutation/LudiekProducer';
import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

export interface LudiekTransaction<
  Input extends BaseInput,
  Output extends BaseOutput,
  Condition extends BaseCondition,
> {
  input?: Input | Input[];
  output?: Output | Output[];
  requirement?: Condition | Condition[];
}
