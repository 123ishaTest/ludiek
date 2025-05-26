<script lang="ts">
  import BlogSidebar from '$lib/components/BlogSidebar.svelte';

  let { data, children } = $props();
</script>

<div class="drawer lg:drawer-open">
  <input id="sidebar-drawer" type="checkbox" class="drawer-toggle" />

  <div class="drawer-content">
    <div class="flex-1 p-4 md:ml-24">
      {@render children()}
    </div>
  </div>

  <div class="drawer-side">
    <label for="sidebar-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="bg-base-200 h-full w-64">
      <BlogSidebar posts={data.posts}></BlogSidebar>
    </ul>
  </div>
</div>
