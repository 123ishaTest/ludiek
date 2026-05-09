import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekContent } from '@ludiek/engine/LudiekContent';
import { LudiekEngine } from '@ludiek/engine/LudiekEngine';
import { LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import z from 'zod';

export type IsNonEmpty<T extends ReadonlyArray<unknown>> = T extends [] ? false : T extends never[] ? false : true;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyEngine = LudiekEngine<any, any, any, any, any, any, any, any>;

export interface HasSchema {
  schema: z.ZodObject<{
    type: z.ZodLiteral;
  }>;
}
/**
 * Given a tuple of LudiekEvaluators, produce a union of their schemas.
 */
export type ContributionSchemas<Contributions extends readonly HasSchema[]> = {
  [Key in keyof Contributions]: Contributions[Key] extends LudiekEngineContribution
    ? Contributions[Key]['schema']
    : never;
};

export type FeatureMap<Features extends readonly LudiekFeature[]> = {
  [Feature in Features[number] as Feature['type']]: Extract<Features[number], { type: Feature['type'] }>;
};

export type PluginMap<Plugins extends readonly LudiekPlugin[] | undefined> = Plugins extends undefined
  ? object
  : {
      [Plugin in NonNullable<Plugins>[number] as Plugin['type']]: Extract<
        NonNullable<Plugins>[number],
        { type: Plugin['type'] }
      >;
    };

export type ContentMap<Contents extends readonly LudiekContent[]> = {
  [Content in Contents[number] as Content['kind']]: Extract<Contents[number], { kind: Content['kind'] }>['schema'];
};
