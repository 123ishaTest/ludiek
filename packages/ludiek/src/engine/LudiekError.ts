/**
 * Base class for all errors related to Ludiek
 */
export abstract class LudiekError extends Error {}

/**
 * Base class for all errors related to plugins
 */
export abstract class PluginError extends LudiekError {}

/**
 * The engine is not injected into the plugin
 */
export class EngineNotInjectedError extends LudiekError {}

/**
 * The registry could not be found
 */
export class LudiekRegistryError extends LudiekError {}
