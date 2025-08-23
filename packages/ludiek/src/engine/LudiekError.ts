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
export class EngineNotInjectedError extends PluginError {}

/**
 * Thrown when a condition evaluator is not found
 */
export class ConditionNotFoundError extends LudiekError {}

/**
 * Thrown when an input processor is not found
 */
export class InputNotFoundError extends LudiekError {}

/**
 * Thrown when an output processor is not found
 */
export class OutputNotFoundError extends LudiekError {}

/**
 * Thrown when a controller is not found
 */
export class ControllerNotFoundError extends LudiekError {}

