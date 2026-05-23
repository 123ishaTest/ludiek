import { LudiekCommand } from '@ludiek/introspection/LudiekCommand';
import { LudiekNode } from '@ludiek/introspection/ir/nodes';

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

export interface LudiekContentIntrospection {
  kinds: LudiekContentKindIntrospection[];
}

export interface LudiekContentKindIntrospection {
  kind: string;

  nodes: LudiekNode[];
  items: {
    id: string;
    [key: string]: unknown;
  }[];
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
