<script lang="ts">
  import { asset, resolve } from '$app/paths';
  import { page } from '$app/state';
  import ThemeToggle from '$lib/components/ThemeToggle.svelte';
  import SidebarToggle from '$lib/components/SidebarToggle.svelte';

  const getStyling = (path: string) => {
    return page.url.pathname.includes(path) ? 'menu-active' : '';
  };
</script>

<div class="navbar bg-base-200 shadow-sm">
  <div class="navbar-start">
    <SidebarToggle />

    <a href="{resolve('/')}" class="hidden lg:inline">
      <p class="btn btn-ghost text-primary text-xl">Ludiek</p>
    </a>
  </div>
  <div class="navbar-center lg:flex">
    <ul class="menu menu-horizontal space-x-2 px-1">
      <li>
        <a href="{resolve('/docs')}" class={getStyling('/docs')}>Docs</a>
      </li>
      <li>
        <a href="{resolve('/demo')}" class={getStyling('/demo')}>Demo</a>
      </li>
    </ul>
  </div>
  <div class="navbar-end px-2">
    <div class="flex flex-row items-center space-x-2">
      <ThemeToggle />

      <a href="https://github.com/123ishaTest/ludiek" target="_blank">
        <img class="w-6" src="{asset('/icons/github.svg')}" alt="Github" />
      </a>
      <a href="https://discord.gg/GVGEAM5jbf" target="_blank">
        <img class="w-6" src="{asset('/icons/discord.svg')}" alt="Discord" />
      </a>
      <a href="https://patreon.com/123ishaTest" target="_blank">
        <img class="w-6" src="{asset('/icons/patreon.svg')}" alt="Patreon" />
      </a>
    </div>
  </div>
</div>
