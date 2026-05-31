<script lang="ts">
  import type { LucideProps } from '@lucide/svelte';
  import type { Component, Snippet } from 'svelte';
  import type { LudiekIntrospection } from '@123ishatest/ludiek';
  import { getIntrospection } from '$lui/util/context';

  interface Props {
    Icon: Component<LucideProps>;
    body?: Snippet<[LudiekIntrospection]>;
    label?: Snippet<[LudiekIntrospection]>;
  }

  let { Icon, body, label }: Props = $props();

  let isOpen = $state(false);

  const introspection = getIntrospection();

</script>

<details class="d-dropdown d-dropdown-top d-dropdown-center"
         open={isOpen}
         onmouseenter={() => isOpen = true}
         onmouseleave={() => isOpen = false}
>
  <summary class="d-btn flex flex-row items-center d-text-primary">
    <Icon size={16} />
    {@render label?.(introspection)}
  </summary>
  <div class="d-dropdown-content bg-base-300 shadow-sm w-max">
    {@render body?.(introspection)}
  </div>
</details>