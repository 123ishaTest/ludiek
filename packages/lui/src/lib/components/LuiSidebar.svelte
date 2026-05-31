<script lang="ts">
  import type { PageType } from '$lui/types/PageType';

  interface Props {
    selectedPage: PageType;
  }

  let { selectedPage = $bindable() }: Props = $props();

  const selectPage = (page: PageType) => {
    selectedPage = page;
  };

</script>

{#snippet button(page: PageType, name: string)}
  <li class:d-menu-active={selectedPage === page}>
    <button onclick={() => selectPage(page)}>{name}</button>
  </li>
{/snippet}

<ul class="d-menu h-full d-bg-base-200 w-56">
  {@render button('dashboard', 'Dashboard')}

  <li>
    <h2 class="d-menu-title">State</h2>
    <ul>
      {@render button('plugin', 'Plugin')}
      {@render button('feature', 'Feature')}
      {@render button('persistence', 'Persistence')}
    </ul>
  </li>

  <li>
    <h2 class="d-menu-title">Contributions</h2>
    <ul>
      {@render button('condition', 'Condition')}
      {@render button('input', 'Input')}
      {@render button('output', 'Output')}
      {@render button('request', 'Request')}
      {@render button('bonus', 'Bonus')}
    </ul>
  </li>

  <li>
    <h2 class="d-menu-title">Other</h2>
    <ul>
      {@render button('content', 'Content')}
    </ul>
  </li>
</ul>
