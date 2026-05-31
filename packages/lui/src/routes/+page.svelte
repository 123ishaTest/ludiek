<script lang="ts">
  import LuiContext from '$lib/LuiContext.svelte';
  import { engine } from './lui-engine.js';
  import { LuiConfigBuilder } from '$lib/LuiConfigBuilder';

  const config = new LuiConfigBuilder().openVisible().build();
</script>

<LuiContext {engine} {config}>
  <div class="h-screen">
  </div>
</LuiContext>
