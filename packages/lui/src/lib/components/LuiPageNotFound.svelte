<script lang="ts">
  import type { PageType } from '$lui/types/PageType';

  interface Props {
    page: PageType;
  }

  let { page }: Props = $props();
</script>

<p>Page '{page}' not found</p>
