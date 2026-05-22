import { LudiekArgument, LudiekCommand } from '@ludiek/introspection/LudiekCommand';
import { LudiekEngineContribution } from '@ludiek/engine/LudiekEngineContribution';
import { AnyEngine, HasSchema } from '@ludiek/util/types';
import { parseZodSchema } from '@ludiek/introspection/ir/parsers';
import {
  LudiekContentIntrospection,
  LudiekContentKindIntrospection,
  LudiekEngineConceptIntrospection,
  LudiekFeaturesIntrospection,
  LudiekIntrospection,
  LudiekPluginsIntrospection,
} from '@ludiek/introspection/LudiekIntrospection';

export class LudiekIntrospector {
  private readonly _engine: AnyEngine;

  constructor(engine: AnyEngine) {
    this._engine = engine;
  }

  /**
   * Perform a full engine introspection
   */
  public introspect(): LudiekIntrospection {
    return {
      content: this.getContent(),
      features: this.getFeatures(),
      plugins: this.getPlugins(),
      condition: this.getCondition(),
      input: this.getInput(),
      output: this.getOutput(),
      request: this.getRequest(),
      bonus: this.getBonus(),
    };
  }

  public getFeatures(): LudiekFeaturesIntrospection {
    return {
      features: this._engine.featureList.map((feature) => {
        return {
          type: feature.type,
        };
      }),
    };
  }

  public getPlugins(): LudiekPluginsIntrospection {
    return {
      plugins: this._engine.pluginList.map((plugin) => {
        return {
          type: plugin.type,
          // TODO(@Isha): Add standardised way to retrieve loaded content
          content: [],
        };
      }),
    };
  }

  public getCondition(): LudiekEngineConceptIntrospection {
    return { commands: this.getCommands(this._engine.condition.list) };
  }
  public getInput(): LudiekEngineConceptIntrospection {
    return { commands: this.getCommands(this._engine.input.list) };
  }
  public getOutput(): LudiekEngineConceptIntrospection {
    return { commands: this.getCommands(this._engine.output.list) };
  }
  public getRequest(): LudiekEngineConceptIntrospection {
    return { commands: this.getCommands(this._engine.request.list) };
  }
  public getBonus(): LudiekEngineConceptIntrospection {
    return { commands: this.getCommands(this._engine.bonus.list) };
  }

  public getCommands(contributions: (LudiekEngineContribution & HasSchema)[]): LudiekCommand[] {
    return contributions.flatMap((contribution) => {
      const node = parseZodSchema(contribution.schema);

      if (node.kind !== 'object') {
        console.warn(`Cannot parse contribution ${contribution.type} as its root schema is not an object`);
        return [];
      }

      const args: LudiekArgument[] = node.fields.flatMap((field) => {
        if (field.path.join('/') === 'type') {
          return [];
        }
        const path = field.path?.length > 0 ? field.path[field.path.length - 1] : 'root';

        if (field.kind == 'array' || field.kind == 'record' || field.kind == 'object' || field.kind == 'unknown') {
          console.warn(`Field kind '${field.kind}' is not supported yet`);
          return [];
        }

        // Handle references to content
        const reference = field.ludiek?.reference;
        let options: string[] = [];
        if (reference) {
          options = this._engine.contentManager.getList(reference).map((v) => v.id);
        }

        return [{ type: field.kind, field: path, options }];
      });

      return [
        {
          command: contribution.type,
          schema: contribution.schema,
          arguments: args,
        },
      ];
    });
  }

  public get allContributions(): (LudiekEngineContribution & HasSchema)[] {
    return [
      ...this._engine.condition.list,
      ...this._engine.input.list,
      ...this._engine.output.list,
      ...this._engine.request.list,
      ...this._engine.bonus.list,
    ];
  }

  public getContent(): LudiekContentIntrospection {
    const cm = this._engine.contentManager;

    const kindNames = cm.getKinds();

    const contentKinds: LudiekContentKindIntrospection[] = kindNames.flatMap((kind) => {
      const schema = cm.getSchema(kind);
      const items = cm.getList(kind);

      const node = parseZodSchema(schema);
      if (node.kind !== 'object') {
        this._engine.logger.warn(`Could not introspect content '${kind}' as its root is not an object`);
        return [];
      }
      return [
        {
          kind,
          nodes: node.fields,
          items: items,
          schema,
        },
      ];
    });

    return {
      kinds: contentKinds,
    };
  }
}
