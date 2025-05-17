<script lang="ts">
  import BlogSidebar from '$lib/components/BlogSidebar.svelte';

  let { data, children } = $props();
</script>

<div class="flex flex-row">
  <BlogSidebar posts={data.posts}></BlogSidebar>

  <div class="ml-24 p-4">
    {@render children()}
  </div>
</div>
