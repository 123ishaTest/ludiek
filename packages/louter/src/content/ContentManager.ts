import type { z, ZodType } from 'zod';
import { ContentKindNotFoundError, ContentNotFoundError } from '@louter/core/LouterError';
import { ContentMapFromKinds } from '@louter/core/types';

export class ContentManager<const Kinds extends Record<string, ZodType<{ id: string }>>> {
  private readonly _content: Partial<ContentMapFromKinds<Kinds>> = {};

  private readonly _kinds: Kinds;

  constructor(kinds: Kinds) {
    this._kinds = kinds;
    this.clear();
  }

  public get content(): Partial<ContentMapFromKinds<Kinds>> {
    return this._content;
  }

  public load(content: ContentMapFromKinds<Kinds>): void {
    for (const kind in content) {
      this.loadKind(kind, Object.values(content[kind]));
    }
  }

  public loadKind<Kind extends keyof Kinds>(kind: Kind, content: z.infer<Kinds[Kind]>[]) {
    const map = this.getMap(kind);
    for (const item of content) {
      map[item.id] = item;
    }
  }

  public getMap<Kind extends keyof Kinds>(kind: Kind): Record<string, z.infer<Kinds[Kind]>> {
    const map = this._content[kind];
    if (!map) {
      throw new ContentKindNotFoundError(`Could not get map of ${kind.toString()}`);
    }
    return map;
  }

  /**
   * Return the content for this kind as a list
   * @param kind
   */
  public getList<Kind extends keyof Kinds>(kind: Kind) {
    return Object.values(this.getMap(kind));
  }

  /**
   * Return the specified piece of content
   * @param id
   * @param kind
   */
  public get<Kind extends keyof Kinds>(id: string, kind: Kind): z.infer<Kinds[Kind]> {
    const content = this._content[kind]?.[id];
    if (!content) {
      throw new ContentNotFoundError(`Could not get '${kind.toString()}' with id '${id}'`);
    }
    return content;
  }

  /**
   * Throw away all currently managed content
   */
  public clear() {
    for (const kind in this._kinds) {
      this._content[kind] = {};
    }
  }
}
