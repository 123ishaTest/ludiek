<script lang="ts">
  import type { Progress } from '@123ishatest/ludiek/dist/util/progress';

  interface Props {
    progress: Progress;
  }

  let { progress }: Props = $props();

  let isFinite = $derived(Number.isFinite(progress.target));
  let percentage = $derived(isFinite ? progress.percentage : 1);
</script>

<div class="flex flex-row items-center justify-around">
  <progress class="progress progress-primary" value={percentage} max="1"></progress>
  {#if isFinite}
    <span class="w-16 text-center">{progress.current} / {progress.target}</span>
  {:else}
    <span class="w-16 text-center">∞</span>
  {/if}
</div>
