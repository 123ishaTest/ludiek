/**
 * Base class for all errors related to Ludiek
 */
export abstract class LudiekError extends Error {}

/**
 * Base class for all errors related to plugins
 */
export abstract class PluginError extends LudiekError {}
