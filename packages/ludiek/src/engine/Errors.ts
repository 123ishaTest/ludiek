import { LudiekError } from '#ludiek/Errors';

export class EngineError extends LudiekError {}

export class ConceptDefinitionNotFoundError extends EngineError {}

export class DuplicateDefinitionError extends EngineError {}

export class DuplicateContentError extends EngineError {}
