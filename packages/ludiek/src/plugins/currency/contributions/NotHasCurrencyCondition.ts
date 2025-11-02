import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface NotHasCurrencyCondition extends BaseCondition {
  type: '/condition/not-has-currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class NotHasCurrencyEvaluator extends LudiekEvaluator<NotHasCurrencyCondition, Dependencies> {
  readonly type = '/condition/not-has-currency';

  evaluate(condition: NotHasCurrencyCondition): boolean {
    return !this.engine.plugins.currency.hasCurrency(condition);
  }
}
