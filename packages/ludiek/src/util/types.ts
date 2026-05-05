import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { LudiekContent } from '@ludiek/engine/LudiekContent';

export type IsNonEmpty<T extends ReadonlyArray<unknown>> = T extends [] ? false : T extends never[] ? false : true;

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
