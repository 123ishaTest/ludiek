export interface CurrencyPluginState {
  balances: Record<string, number>;
}

export const createCurrencyState = (): CurrencyPluginState => {
  return {
    balances: {},
  };
};
