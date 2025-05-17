<script lang="ts">
  import { base } from '$app/paths';
</script>

<div class="navbar bg-base-100 shadow-sm">
  <div class="navbar-start">
    <p class="btn btn-ghost text-xl">Ludiek</p>
  </div>
  <div class="navbar-center hidden lg:flex">
    <ul class="menu menu-horizontal px-1">
      <li>
        <a href="{base}/docs">Docs</a>
      </li>
      <li>
        <a href="{base}/blog">Blog</a>
      </li>
    </ul>
  </div>
  <div class="navbar-end px-2">
    <div class="flex flex-row space-x-2">
      <a href="https://github.com/123ishaTest/ludiek" target="_blank">
        <img class="w-6 text-white" src="/icons/github.svg" alt="Github" />
      </a>
      <a href="https://discord.gg/GVGEAM5jbf" target="_blank">
        <img class="w-6 text-white" src="/icons/discord.svg" alt="Discord" />
      </a>
      <a href="https://patreon.com/123ishaTest" target="_blank">
        <img class="w-6 text-white" src="/icons/patreon.svg" alt="Patreon" />
      </a>
    </div>
  </div>
</div>
