<script lang="ts">
  import type { LudiekContentKindIntrospection, LudiekNode } from '@123ishatest/ludiek';
  import type { Component } from 'svelte';
  import LuiContentRenderObject from '$lui/components/content/render/LuiContentRenderObject.svelte';
  import { getConfig } from '$lui/util/context';

  interface Props {
    introspection: LudiekContentKindIntrospection;
  }

  let { introspection }: Props = $props();

  let nodes = $derived(introspection.nodes);
  let items = $derived(introspection.items);

  const config = getConfig();
  let registry = $derived(config.content.renderers)

  const getRenderComponent = (node: LudiekNode): Component<{ value: never }> => {

    // If it has a meta field indicating what it should render is, return that if it exists
    const field = node?.ludiek?.render;

    if (field && registry[field]) {
      return registry[field];
    }

    // If not, try to look up the kind as a fallback
    const kind = node.kind;
    const kindComponent = registry[kind];
    if (kindComponent) {
      return kindComponent;
    }

    // If all else fails, return it as an object display
    return LuiContentRenderObject;

  };
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
          <svelte:boundary>

            {@const key = node.path.join("")}
            {@const Component = getRenderComponent(node)}
            {@const value = piece[key] as never}

            <td class="px-4 py-3 align-top">
              <Component {value} />
            </td>

            {#snippet failed(error)}
              <td class="align-top d-alert d-alert-error"> Render error: {error}</td>
            {/snippet}
          </svelte:boundary>
        {/each}
      </tr>
    {/each}
    </tbody>
  </table>
</div>