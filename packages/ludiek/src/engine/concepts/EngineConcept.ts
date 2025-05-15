import { type $ZodTypeDiscriminable, z, type ZodDiscriminatedUnion } from 'zod';
import type { EngineConceptDefinition } from '@ludiek/engine/concepts/EngineConceptDefinition';
import { ConceptDefinitionNotFoundError, DuplicateDefinitionError } from '@ludiek/engine/Errors';

export abstract class EngineConcept<C extends EngineConceptDefinition> {
  private readonly _definitions: Record<string, C> = {};
  readonly name: string;

  protected constructor(name: string) {
    this.name = name;
  }

  register(definition: C): void {
    if (definition.key in this._definitions) {
      throw new DuplicateDefinitionError(
        `[${this.name.toUpperCase()}] Already has definition for key '${definition.key}'.`,
      );
    }
    this._definitions[definition.key] = definition;
  }

  get(type: string): C {
    const definition = this._definitions[type];
    if (definition == undefined) {
      throw new ConceptDefinitionNotFoundError(
        `[${this.name.toUpperCase()}] Could not find handler for type '${type}'.`,
      );
    }
    return definition;
  }

  introspect(): ZodDiscriminatedUnion {
    // TODO(@Isha): Improve
    const schemas = Object.values(this._definitions).map((def) => def.schema) as unknown as [
      $ZodTypeDiscriminable,
      ...$ZodTypeDiscriminable[],
    ];

    return z.discriminatedUnion(schemas);
  }
}
