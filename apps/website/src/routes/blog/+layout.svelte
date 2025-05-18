<script lang="ts">
  import BlogSidebar from '$lib/components/BlogSidebar.svelte';

  let { data, children } = $props();
</script>

<div class="flex h-full w-full flex-row">
  <div class="bg-base-200 hidden h-full w-64 sm:inline">
    <BlogSidebar posts={data.posts}></BlogSidebar>
  </div>

  <div class="flex-1 p-4 md:ml-24">
    {@render children()}
  </div>
</div>
