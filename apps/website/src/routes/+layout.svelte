<script lang="ts">
  import '../app.css';
  import LudiekNavbar from '$lib/components/LudiekNavbar.svelte';

  let { children } = $props();
</script>

<div class="flex h-screen flex-col">
  <LudiekNavbar />
  <div class="flex flex-grow">
    {@render children()}
  </div>
</div>
