import type { Content } from '@ludiek/content/Content';
import type { Features } from '@ludiek/features/Features';
import { Wallet } from '@ludiek/features/wallet/Wallet';
import { Statistics } from '@ludiek/features/statistics/Statistics';
import { Settings } from '@ludiek/features/settings/Settings';
import { Engine } from '@ludiek/engine/Engine';
import { Game } from '@ludiek/Game';

// Load the content
// TODO(@Isha): Get from content parser
const content: Content = {
  currencies: [
    {
      id: '/currency/money',
      name: 'Money',
      icon: 'coin-gold.png',
    },
    {
      id: '/currency/diamond',
      name: 'Diamonds',
      icon: 'diamond.png',
    },
  ],
  statistics: [],
  settings: [
    {
      type: 'boolean',

      id: '/setting/example',
      name: 'Example Setting',
      options: [
        { name: 'High', value: true },
        { name: 'Low', value: false },
      ],
      default: false,
    },
  ],
};

// Declare the features
const features: Features = {
  wallet: new Wallet(),
  statistics: new Statistics(),
  settings: new Settings(),
};

// Construct the engine
const engine = new Engine();

export const demoGame: Game = new Game(engine, features, content);
