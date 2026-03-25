import { CurrencyPlugin, IsUpgradeAtLevelEvaluator } from '@123ishatest/ludiek';

declare module '@123ishatest/ludiek' {
  interface LudiekRegistry {
    plugins: readonly [CurrencyPlugin];
    // features: LudiekFeature[];
    evaluators: readonly [IsUpgradeAtLevelEvaluator];
    // consumers: readonly[ EmptyConsumer];
    // producers: readonly [GainKeyItemProducer];
    // controllers: LudiekController[];
    // modifiers: LudiekModifier[];
  }
}
