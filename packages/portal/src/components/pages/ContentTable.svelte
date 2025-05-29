<script lang="ts">

  import type { ContentUnit } from '@123ishatest/content-parser';
  import { z, type ZodObject } from 'zod';
  import FormObjectTableRow from '../forms/inputs/FormObjectTableRow.svelte';
  import { capitalize } from '@123ishatest/ludiek';

  interface Props {
    units: ContentUnit[];
    schema: ZodObject;
  }

  let { units, schema }: Props = $props();

  let json = $derived(z.toJSONSchema(schema, { io: 'input' }));

  console.log("in table", schema.shape.icon)

</script>

<div class="overflow-x-auto">
  <table class="table">
    <!-- head -->
    <thead>
    <tr>
      <th>Path</th>
      {#each Object.keys(json.properties ?? {}) as key}
        <th>{capitalize(key)}</th>
      {/each}
    </tr>
    </thead>
    <tbody>
    {#each units as unit}
      <tr>
        <td>{unit.path}</td>
        <FormObjectTableRow {json} data={unit.data} compact={true} />
      </tr>
    {/each}

    </tbody>
  </table>
</div>