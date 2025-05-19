import type { ZodDiscriminatedUnion, ZodType } from 'zod';
import type { Features } from '#ludiek/features/Features';
import { Requirements } from '#ludiek/engine/concepts/requirements/Requirements';
import { Numbers } from '#ludiek/engine/concepts/numbers/Numbers';
import type { Number } from '#ludiek/engine/concepts/numbers/Number';
import { Effects } from '#ludiek/engine/concepts/effects/Effects';
import type { Requirement } from '#ludiek/engine/concepts/requirements/Requirement';
import { DuplicateContentError } from '#ludiek/engine/Errors';
import { isNumber } from '#ludiek/util/types';
import type { Effect } from '#ludiek/engine/concepts/effects/Effect';
import type { EngineContribution } from '#ludiek/engine/EngineContribution';
import type { ContentDefinition } from '#ludiek/content/ContentDefinition';

export class Engine {
  private _features!: Features;
  private _cachedIntrospection: Record<string, ZodDiscriminatedUnion> | undefined;

  // Content
  public content: Record<string, ZodType> = {};

  // Engine concepts
  public requirements: Requirements;
  public numbers: Numbers;
  public effects: Effects;

  constructor() {
    this.requirements = new Requirements();
    this.numbers = new Numbers();
    this.effects = new Effects();
  }

  public injectFeatures(features: Features): void {
    this._features = features;
  }

  public hasRequirement(requirement: Requirement): boolean {
    return this.requirements.hasRequirement(requirement, this._features);
  }

  public addContent(content: ContentDefinition): void {
    if (content.key in this.content) {
      throw new DuplicateContentError(`Cannot register Content with key '${content.key}' as it already exists.`);
    }
    this.content[content.key] = content.schema;
  }

  /**
   * Evaluates a number object
   * @param number
   */
  public number(number: Number | number): number {
    if (isNumber(number)) {
      return number;
    }
    return this.numbers.evaluate(number, this._features);
  }

  public perform(effects: Effect[]): void {
    effects.forEach((effect) => this.effects.perform(effect, this._features));
  }

  public introspect(): Record<string, ZodDiscriminatedUnion> {
    // TODO(@Isha): Move caching to concept?
    if (!this._cachedIntrospection) {
      this._cachedIntrospection = {
        requirement: this.requirements.introspect(),
        number: this.numbers.introspect(),
        effect: this.effects.introspect(),
      };
    }
    return this._cachedIntrospection;
  }

  public addContribution(contribution: EngineContribution) {
    // Add engine concepts
    contribution.engine?.effects?.forEach((e) => this.effects.register(e));
    contribution.engine?.numbers?.forEach((n) => this.numbers.register(n));
    contribution.engine?.requirements?.forEach((r) => this.requirements.register(r));

    // Add content
    contribution.content?.forEach((content) => {
      this.addContent(content);
    });
  }
}
