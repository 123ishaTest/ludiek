<script lang="ts">

  import { getEngine } from '../../util/context.js';

  const engine = $derived(getEngine());

  // TODO(@Isha): This only works if `save()` is side-effect free.
  //  Not sure we can guarantee that
  let saveFile = $derived(engine.save());

  let formattedSave = $derived(JSON.stringify(saveFile, null, 2));
</script>


<div class="flex flex-col h-full">
  <div class="mockup-code w-full overflow-y-auto">
    <pre>{formattedSave}</pre>
  </div>
</div>