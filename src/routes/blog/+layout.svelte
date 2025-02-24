<script lang="ts">
  let { children } = $props();

</script>

<div class="flex flex-row border">
  <div class="flex flex-col w-96 border">
    Sidebar
  </div>

  <div class="flex flex-1 p-4 flex-col h-full">
    {@render children()}
  </div>

  <div class="flex flex-col w-96 border">
    Sidebar
  </div>
</div>


