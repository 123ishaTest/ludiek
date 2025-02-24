import type { SaveData } from '$lib/ludiek/tools/saving/SaveData';

export interface WalletSaveData extends SaveData {
  currencies: Record<string, number>;
}
