import { z } from 'zod';
import { CurrencySchema } from '@ludiek/features/wallet/Currency';
import { EffectDefinition, EffectSchema } from '@ludiek/engine/concepts/effects/Effect';
import type { Features } from '@ludiek/features/Features';

export const GainCurrencyEffectSchema = EffectSchema.extend({
  type: z.literal('gain-currency'),
  something: z.string(),
  currency: CurrencySchema,
})
  .brand<'effect'>()
  .meta({
    title: 'GainCurrencyEffect',
    description: 'Award a currency to the wallet',
  });

export type GainCurrencyEffect = z.infer<typeof GainCurrencyEffectSchema>;

export class GainCurrencyEffectDefinition extends EffectDefinition {
  key = 'gain-currency';

  schema = GainCurrencyEffectSchema;

  perform(effect: GainCurrencyEffect, features: Features): void {
    features.wallet.gainCurrency(effect.currency);
  }
}
