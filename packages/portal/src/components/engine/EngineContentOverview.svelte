<script lang="ts">
  import type { ContentDefinition } from '@123ishatest/ludiek/src/content/ContentDefinition.js';
  import { z } from 'zod';

  interface Props {
    definitions: ContentDefinition[];
  }

  let { definitions }: Props = $props();
</script>

{#if definitions?.length > 0}
  <table class="table mt-0">
    <thead>
    <tr>
      <th>Content</th>
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
