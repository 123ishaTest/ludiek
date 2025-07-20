import { CurrencyPlugin, LudiekEngine } from '@123ishatest/ludiek';

// Declare content
const currencies = [
  { id: '/currency/money', name: 'Money', icon: '/icon/coin' },
  { id: '/currency/gems', name: 'Gems', icon: '/icon/gem-blue' },
] as const;

// Define plugins
const currency = new CurrencyPlugin(currencies);

// Create engine
export const engine = new LudiekEngine([currency]);
export type EngineAPI = typeof engine.api;
