import { LudiekError } from '$lib/ludiek/engine/Errors';

export class WalletError extends LudiekError {}

export class InvalidCurrencyError extends WalletError {}
