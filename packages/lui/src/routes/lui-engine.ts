import { l, LudiekEngine } from '@123ishatest/ludiek';
import z from 'zod';

const AchievementSchema = z.strictObject({
  id: z.string(),
  condition: z.optional(l.condition()),
});
const CurrencyDetailSchema = z.strictObject({
  id: z.string(),
  name: z.string(),
  icon: z.string(),
});

export const engine = new LudiekEngine({
  content: [
    { kind: 'achievement', schema: AchievementSchema },
    { kind: 'currency', schema: CurrencyDetailSchema },
  ],
  debug: true,
});

engine.contentManager.loadKind('achievement', [
  { id: '/achievement/gain-10-money' },
  { id: '/achievement/gain-25-money' },
]);

engine.contentManager.loadKind('currency', [
  { id: '/currency/money', name: 'Money', icon: 'coinGold' },
  { id: '/currency/diamonds', name: 'Diamond', icon: 'gemDiamond' },
]);
