<script lang="ts">

  import { RequestHistory } from '@123ishatest/ludiek';

  interface Props {
      history: RequestHistory;
  }

  let { history }: Props = $props();
</script>

<div class="flex flex-row h-48 bg-base-300 p-4">

  {#each history.requests as request }
    <span>{request.type}</span>
  {/each}
</div>