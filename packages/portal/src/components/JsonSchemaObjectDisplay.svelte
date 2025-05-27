<script lang="ts">
  import { z } from 'zod';

  interface Props {
    schema: z.core.JSONSchema.ObjectSchema;
  }

  let { schema }: Props = $props();

  let properties: [string, z.core.JSONSchema.BaseSchema][] = $derived.by(() => {
    return Object.entries(schema.properties).map(([key, prop]) => {
      return [key as string, prop as z.core.JSONSchema.BaseSchema] as const;
    });
  });

  const getType = (prop: z.core.JSONSchema.BaseSchema): string => {
    if (prop.type === 'array') {
      return (((prop as z.core.JSONSchema.ArraySchema).items as z.core.JSONSchema.BaseSchema).type ?? 'unknown') + '[]';
    }
    return prop.type ?? '';
  };

  const isRequired = (key: string): boolean => {
    return schema.required?.includes(key) ?? false;
  };

  const getDefault = (prop: z.core.JSONSchema.BaseSchema): string => {
    if (prop.default) {
      return prop.default.toString();
    }
    if (prop.const) {
      return prop.const.toString();
    }
    return '';
  };
</script>

<table class="table mt-2 mb-0">
  <thead>
  <tr>
    <th>Attribute</th>
    <th>Type</th>
    <th>Description</th>
    <th>Default</th>
  </tr>
  </thead>
  <tbody>
  {#each properties as [key, prop]}
    <tr>
      <td>{key}{isRequired(key) ? '*' : ''}</td>
      <td>{getType(prop)}</td>
      <td>{prop.description}</td>
      <td>{getDefault(prop)}</td>
    </tr>
  {/each}
  </tbody>
</table>
