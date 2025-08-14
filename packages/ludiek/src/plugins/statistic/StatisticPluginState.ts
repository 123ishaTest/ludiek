export interface StatisticPluginState {
  scalar: Record<string, number>;
  map: Record<string, Record<string, number>>;
}

export const createStatisticState = (): StatisticPluginState => {
  return {
    scalar: {},
    map: {},
  };
};
