<script lang="ts">


  import type { PageType } from '$lib/types/PageType.js';

  interface Props {
    selectedPage: PageType;
  }

  let { selectedPage = $bindable() }: Props = $props();

  const selectPage = (page: PageType) => {
    selectedPage = page;
  };

</script>

{#snippet button(page: PageType, name: string)}
  <li class:menu-active={selectedPage === page}>
    <button onclick={() => selectPage(page)}>{name}</button>
  </li>
{/snippet}

<ul class="menu h-full bg-base-200 rounded-box w-56">
  {@render button('dashboard', 'Dashboard')}

  <li>
    <h2 class="menu-title">State</h2>
    <ul>
      {@render button('plugin', 'Plugin')}
      {@render button('feature', 'Feature')}
      {@render button('persistence', 'Persistence')}
    </ul>
  </li>

  <li>
    <h2 class="menu-title">Contributions</h2>
    <ul>
      {@render button('condition', 'Condition')}
      {@render button('input', 'Input')}
      {@render button('output', 'Output')}
      {@render button('request', 'Request')}
      {@render button('bonus', 'Bonus')}
    </ul>
  </li>

  <li>
    <h2 class="menu-title">Other</h2>
    <ul>
      {@render button('content', 'Content')}
    </ul>
  </li>
</ul>
