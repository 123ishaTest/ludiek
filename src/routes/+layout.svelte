<script lang="ts">
  import '../app.css';
  import { base } from '$app/paths';

  let { children } = $props();
</script>

<div class="flex flex-row justify-center bg-gray-200 p-4">

  <div class="flex flex-row space-x-4">
    <a href="{base}/docs">Docs</a>
<!--    <a href="{base}/demo">Demo</a>-->
    <a href="{base}/blog">Blog</a>
<!--    <a href="{base}/content-studio">Content Studio</a>-->
  </div>

</div>

<div class="flex flex-col h-full">
  {@render children()}
</div>
