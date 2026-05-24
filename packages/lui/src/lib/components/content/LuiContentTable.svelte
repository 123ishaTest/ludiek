<script lang="ts">
  import type { LudiekContentKindIntrospection } from '@123ishatest/ludiek';

  interface Props {
    introspection: LudiekContentKindIntrospection;
  }

  let { introspection }: Props = $props();

  let nodes = $derived(introspection.nodes);
  let items = $derived(introspection.items);
</script>


<div class="overflow-x-auto">
  <table class="d-table">
    <thead class="">
    <tr>
      {#each nodes as node (node.path)}
        <th class="px-4 py-3 text-left font-semibold capitalize">{node.path.join('.')}</th>
      {/each}
    </tr>
    </thead>

    <tbody>
    {#each items as piece (piece.id)}
      <tr class="">
        {#each nodes as node (node.path)}
          {@const key = node.path.join("")}
          {@const value = piece[key]}

          <!-- TODO(@Isha): Add render registry here -->
          <td class="px-4 py-3 align-top">
            {JSON.stringify(value, null, 2)}
          </td>
        {/each}
      </tr>
    {/each}
    </tbody>
  </table>
</div>