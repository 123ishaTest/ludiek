// Plugin

export { AchievementPlugin } from '@ludiek/plugins/achievement/AchievementPlugin';
export {
  type AchievementPluginState,
  createAchievementState,
} from '@ludiek/plugins/achievement/AchievementPluginState';

// Conditions
export { HasAchievementEvaluator } from '@ludiek/plugins/achievement/contributions/HasAchievementCondition';

// Output
export { EarnAchievementProducer } from '@ludiek/plugins/achievement/contributions/EarnAchievementOutput';
export { type AchievementDefinition } from '@ludiek/plugins/achievement/AchievementDefinition';

// Events
export type { AchievementEarned } from '@ludiek/plugins/achievement/AchievementEvents';
