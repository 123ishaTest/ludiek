<script lang="ts">
  import '../app.css';

  let { children } = $props();
</script>

<div class="flex flex-col p-4">
  {@render children()}
</div>
