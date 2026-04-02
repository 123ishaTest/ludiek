import { LudiekFeature } from '@ludiek/engine/LudiekFeature';
import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

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
