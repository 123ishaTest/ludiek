export interface KeyItemPluginState {
  record: Record<string, boolean>;
}

export const createKeyItemState = (): KeyItemPluginState => {
  return {
    record: {},
  };
};
