<script lang="ts">
  import BlogSidebar from '$lib/components/BlogSidebar.svelte';

  let { data, children } = $props();
</script>

<div class="flex flex-row">
  <BlogSidebar posts={data.posts}></BlogSidebar>

  <div class="w-full p-4 md:ml-24">
    {@render children()}
  </div>
</div>
