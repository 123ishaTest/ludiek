export abstract class LuiError extends Error {}

export class EngineNotFoundError extends LuiError {}

export class IntrospectionNotFoundError extends LuiError {}

export class ContentRenderRegistryNotFoundError extends LuiError {}
