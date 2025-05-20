<script lang="ts">
  import type { EngineConceptDefinition } from '@123ishatest/ludiek';
  import { z } from 'zod';

  interface Props {
    title: string;
    definitions: EngineConceptDefinition[];
  }

  let { title, definitions }: Props = $props();

  console.log(definitions);
</script>

{#if definitions?.length > 0 }
  <table class="table mt-0">
    <thead>
    <tr>
      <th>{title}</th>
      <th>Description</th>
      <th>Arguments</th>
    </tr>
    </thead>
    <tbody>
    {#each definitions as definition}
      {@const json = z.toJSONSchema(definition.schema, { io: 'input' })}
      <tr>
        <td>{json.title}</td>
        <td>{json.description}</td>
        <td>{Object.keys(json.properties).join(", ")}</td>
      </tr>
    {/each}

    </tbody>
  </table>
{/if}