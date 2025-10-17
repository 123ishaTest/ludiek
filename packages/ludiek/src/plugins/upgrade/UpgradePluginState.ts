export interface UpgradePluginState {
  levels: Record<string, number>;
}

export const createUpgradeState = (): UpgradePluginState => {
  return {
    levels: {},
  };
};
