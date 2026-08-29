import { BaseOutput } from '@ludiek/engine/mutation/LudiekProducer';
import { BaseCondition } from '@ludiek/engine/condition/LudiekEvaluator';

export interface CouponDefinition {
  id: string;
  hash: string;
  output: BaseOutput | BaseOutput[];
  condition?: BaseCondition;
}
