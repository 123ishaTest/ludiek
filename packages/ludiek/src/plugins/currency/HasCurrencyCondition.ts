import { BaseCondition, LudiekEvaluator } from '@ludiek/engine/condition/LudiekEvaluator';
import { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';

interface HasCurrencyCondition extends BaseCondition {
  type: '/condition/has-currency';
  id: string;
  amount: number;
}

type Dependencies = {
  plugins: [CurrencyPlugin];
};

export class HasCurrencyEvaluator extends LudiekEvaluator<HasCurrencyCondition, Dependencies> {
  readonly type = '/condition/has-currency';

  evaluate(condition: HasCurrencyCondition): boolean {
    return this.engine.plugins.currency.hasCurrency(condition);
  }
}
