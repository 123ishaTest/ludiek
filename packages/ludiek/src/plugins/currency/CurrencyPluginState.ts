export interface CurrencyPluginState {
  balances: Record<string, number>;
  totals: Record<string, number>;
}

export const createCurrencyState = (): CurrencyPluginState => {
  return {
    balances: {},
    totals: {},
  };
};
