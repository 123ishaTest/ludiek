import { Game } from '$lib/ludiek/Game';
import type { Features } from '$lib/ludiek/features/Features';
import { Wallet } from '$lib/ludiek/features/wallet/Wallet';
import type { Content } from '$lib/ludiek/content/Content';
import { Engine } from '$lib/ludiek/engine/Engine';
import { CurrencyRequirementDefinition } from '$lib/ludiek/features/wallet/requirements/CurrencyRequirementDefinition';
import { zodToJsonSchema } from 'zod-to-json-schema';

// Load the content
const content: Content = {
  currencies: ['money', 'diamonds'],
};

// Construct the engine
const engine = new Engine();
engine.registerRequirement(new CurrencyRequirementDefinition());

// Declare the features
const features: Features = {
  wallet: new Wallet(content.currencies),
};

const game = new Game(features, engine, content);

const introspection = game.engine.introspect();

const jsonSchema = zodToJsonSchema(introspection.requirements, 'requirement');
console.log(JSON.stringify(jsonSchema, null, 2));
