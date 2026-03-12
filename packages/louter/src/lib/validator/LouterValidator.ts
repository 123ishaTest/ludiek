import type { KindDefinitions } from '$lib/core/types.js';
import type { LouterStage } from '$lib/core/LouterStage.js';
import type { LouterContext } from '$lib/core/LouterContext.js';
import { LouterWarningType } from '$lib/core/LouterWarningType.js';
import { prettifyError } from 'zod';

/**
 * Validate all LouterObjects through their Zod schemas
 */
export class LouterValidator<Kinds extends KindDefinitions> implements LouterStage<Kinds> {
  run(ctx: LouterContext<Kinds>): void {
    ctx.objects.forEach((object) => {
      const schema = ctx.kinds[object.kind];
      if (!schema) {
        ctx.warnings.push({
          path: object.path,
          type: LouterWarningType.InvalidKind,
          message: `Invalid content kind '${object.kind}'`,
        });
        return;
      }

      const zodResult = schema.safeParse(object.data);
      if (!zodResult.success) {
        ctx.warnings.push({
          path: object.path,
          type: LouterWarningType.ZodValidationFailed,
          message: prettifyError(zodResult.error).toString(),
        });
        return;
      }

      const id = object.data['id'] as string | undefined;
      if (!id) {
        ctx.warnings.push({
          path: object.path,
          type: LouterWarningType.MissingGlobalIdKey,
          message: `Content does not seem to have the global idKey 'id'`,
        });
        return;
      }

      if (ctx.content[object.kind]?.[id]) {
        ctx.warnings.push({
          path: object.path,
          type: LouterWarningType.DuplicateId,
          message: `Duplicate id '${id}'`,
        });
        return;
      }
      // TODO(@Isha): Fix?
      // @ts-expect-error Fix map already existing
      ctx.content[object.kind][id] = zodResult.data;
    });
  }



}