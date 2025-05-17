<script lang="ts">
  import '../app.css';
  import LudiekNavbar from '$lib/components/LudiekNavbar.svelte';

  let { children } = $props();
</script>

<div>
  <LudiekNavbar />

  <div class="grow p-4">
    {@render children()}
  </div>
</div>
