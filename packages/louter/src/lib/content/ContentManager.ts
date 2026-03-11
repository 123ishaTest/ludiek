import type { z } from 'zod';
import type { ContentKind } from '$lib/core/ContentKind.js';
import { ContentKindNotFoundError, ContentNotFoundError } from '$lib/core/LouterError.js';

export class ContentManager<
	Schema extends z.ZodType<{ id: string }>,
	KindDescription extends ContentKind<Schema>,
	KindMap extends Record<string, KindDescription>
> {
	private _content: Partial<{
		[Kind in keyof KindMap]: Record<string, z.infer<KindMap[Kind]['schema']>>;
	}> = {};

	private readonly _kinds: KindMap;

	constructor(kinds: KindMap) {
		this._kinds = kinds;
		this.clear();
	}

	public load(content: {
		[Kind in keyof KindMap]: Record<string, z.infer<KindMap[Kind]['schema']>>;
	}): void {
		for (const kind in content) {
			this.loadKind(kind, Object.values(content[kind]));
		}
	}

	public loadKind<const Kind extends keyof KindMap>(
		kind: Kind,
		content: z.infer<KindMap[Kind]['schema']>[]
	): void {
		content.forEach((item) => {
			this.getMap(kind)[item.id] = item;
		});
	}

	/**
	 * Return the content for this kind as a list
	 * @param kind
	 */
	public getMap<const Kind extends keyof KindMap>(
		kind: Kind
	): Record<string, z.infer<KindMap[Kind]['schema']>> {
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
	public getList<const Kind extends keyof KindMap>(kind: Kind): z.infer<KindMap[Kind]['schema']>[] {
		return Object.values(this.getMap(kind));
	}

	/**
	 * Return the specified piece of content
	 * @param id
	 * @param kind
	 */
	public get<const Kind extends keyof KindMap>(
		id: string,
		kind: Kind
	): z.infer<KindMap[Kind]['schema']> {
		const content = this._content[kind]?.[id];
		if (!content) {
			throw new ContentNotFoundError(`Could not get '${kind.toString()}' with id '${id}'`);
		}
		return content;
	}

	/**
	 * Throw away all currently managed content
	 */
	public clear(): void {
		for (const key in this._kinds) {
			this._content[key] = {};
		}
	}
}
