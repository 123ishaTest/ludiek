import { LudiekContentIntrospection } from '@ludiek/introspection/LudiekContentIntrospection';
import { LudiekCommand } from '@ludiek/introspection/LudiekCommand';

export interface LudiekIntrospection {
  content: LudiekContentIntrospection;
  features: LudiekFeaturesIntrospection;
  plugins: LudiekPluginsIntrospection;

  condition: LudiekEngineConceptIntrospection;
  input: LudiekEngineConceptIntrospection;
  output: LudiekEngineConceptIntrospection;
  request: LudiekEngineConceptIntrospection;
  bonus: LudiekEngineConceptIntrospection;
}

export interface LudiekEngineConceptIntrospection {
  commands: LudiekCommand[];
}

export interface LudiekFeaturesIntrospection {
  features: LudiekFeatureIntrospection[];
}

export interface LudiekFeatureIntrospection {
  type: string;
}

export interface LudiekPluginsIntrospection {
  plugins: LudiekPluginIntrospection[];
}

export interface LudiekPluginIntrospection {
  type: string;
  content: string[];
}
