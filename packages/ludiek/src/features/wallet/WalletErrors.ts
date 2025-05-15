import { FeatureError } from '@ludiek/features/FeatureError';

export class WalletError extends FeatureError {}

export class InvalidCurrencyError extends WalletError {}
