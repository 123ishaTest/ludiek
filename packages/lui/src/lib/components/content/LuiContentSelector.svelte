<script lang="ts">
  import type { LudiekContentIntrospection } from "@123ishatest/ludiek";

  interface Props {
      introspection: LudiekContentIntrospection;
      selectedKind: string;
  }

  let { introspection, selectedKind = $bindable() }: Props = $props();

  const selectKind = (kind: string) => {
    selectedKind = kind;
  }

  let content = $derived(introspection.kinds)
</script>

<ul class="d-menu d-menu-horizontal d-rounded-box">
  {#each content as c (c.kind)}
    <li>
      <button class="capitalize" class:menu-active={selectedKind === c.kind} onclick={() => selectKind(c.kind)}>{c.kind} ({c.items.length})</button>
    </li>
  {/each}
</ul>
