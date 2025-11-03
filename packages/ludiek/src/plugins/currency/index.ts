// Plugin
export { CurrencyPlugin } from '@ludiek/plugins/currency/CurrencyPlugin';
export type { CurrencyDefinition } from '@ludiek/plugins/currency/CurrencyDefinition';
export { type CurrencyPluginState, createCurrencyState } from '@ludiek/plugins/currency/CurrencyPluginState';
export type { CurrencyGained, CurrencyChanged } from '@ludiek/plugins/currency/CurrencyEvents';

// Conditions
export { HasCurrencyEvaluator } from '@ludiek/plugins/currency/contributions/HasCurrencyCondition';

// Input
export { LoseCurrencyConsumer, type LoseCurrencyInput } from '@ludiek/plugins/currency/contributions/LoseCurrencyInput';

// Output
export {
  GainCurrencyProducer,
  type GainCurrencyOutput,
} from '@ludiek/plugins/currency/contributions/GainCurrencyOutput';
