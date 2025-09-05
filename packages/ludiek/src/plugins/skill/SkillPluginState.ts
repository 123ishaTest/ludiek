export interface SkillPluginState {
  experience: Record<string, number>;
}

export const createSkillState = (): SkillPluginState => {
  return {
    experience: {},
  };
};
