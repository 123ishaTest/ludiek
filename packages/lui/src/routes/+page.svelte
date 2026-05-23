<script lang="ts">
  import LuiContext from '$lib/LuiContext.svelte';
  import { engine } from './lui-engine.js';
</script>

<LuiContext {engine} openVisible={true}>
  <div class="h-screen">
  </div>
</LuiContext>
