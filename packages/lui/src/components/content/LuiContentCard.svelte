<script lang="ts">
  import { getEngine } from '../../util/context.js';

  interface Props {
    id: string;
    kind?: string;
  }

  let { id, kind }: Props = $props();

  const engine = getEngine();

  let content = $derived.by(() => {
    if (kind) {
      return engine.contentManager.get(id, kind)
    } else {
      return engine.contentManager.getById(id)
    }
  })
</script>


<div class="flex flex-col space-y-4 items-center p-4 rounded-sm shadow-xl">
  <h2 class="">{id}</h2>

  <pre class="text-primary-content">{JSON.stringify(content, null, 2)}</pre>
</div>

