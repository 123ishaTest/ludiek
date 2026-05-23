<script lang="ts">

  import type { PageType } from '../types/PageType.js';

  interface Props {
    page: PageType;
  }

  let { page }: Props = $props();
</script>

<p>Page '{page}' not found</p>