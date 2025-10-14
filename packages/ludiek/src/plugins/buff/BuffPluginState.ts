export interface BuffPluginState {
  duration: Record<string, number>;
}

export const createBuffState = (): BuffPluginState => {
  return {
    duration: {},
  };
};
