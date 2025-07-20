import { CurrencyPlugin, LudiekEngine, LudiekGame } from '@123ishatest/ludiek';
import { Farming } from '$lib/demo/Farming';

// First we define the shapes of our content
export interface CurrencyDetail {
  id: string;
  name: string;
  icon: string;
}

export interface PlantDetail {
  id: string;
  name: string;
  growthTime: number;
  moneyReward: number;
}

// First we declare our fully static content
const plants = [
  { id: '/plant/sunflower', name: 'Sunflower', growthTime: 10, moneyReward: 10 },
  { id: '/plant/cauliflower', name: 'Cauliflower', growthTime: 15, moneyReward: 20 },
] as const satisfies PlantDetail[];

const currencies = [
  { id: '/currency/money', name: 'Money', icon: '/icon/coin' },
  { id: '/currency/gems', name: 'Gems', icon: '/icon/gem-blue' },
] as const satisfies CurrencyDetail[];

// Define plugins
const currency = new CurrencyPlugin(currencies);

// Create engine
const engine = new LudiekEngine({
  currency: currency,
});

// Extract some neat utility types
export type EngineAPI = typeof engine.api;
export type PlantId = (typeof plants)[number]['id'];

// Create your game
const farming = new Farming(plants);

export const game = new LudiekGame(engine, {
  farming: farming,
});

// This is now fully type-safe :D
game.features.farming.sow('/plant/sunflower');
game.engine.api.currency.gainCurrency('/currency/gems', 3);
