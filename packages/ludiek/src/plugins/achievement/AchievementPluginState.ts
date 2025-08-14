export interface AchievementPluginState {
  record: Record<string, boolean>;
}

export const createAchievementState = (): AchievementPluginState => {
  return {
    record: {},
  };
};
