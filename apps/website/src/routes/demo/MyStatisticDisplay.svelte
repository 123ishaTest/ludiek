<script lang="ts">
  import { content } from '$lib/demo/content';
  import { ScalarStatisticComponent } from '@123ishatest/lui';

  interface Props {
    statisticId: string;
  }

  let { statisticId }: Props = $props();

  let statisticDetail = $derived(content.getStatistic(statisticId));
</script>

<ScalarStatisticComponent id={statisticId}>
  {#snippet render(state)}
    <div class="flex flex-row items-center space-x-1">
      <span>{statisticDetail.name}: {state.value}</span>
    </div>
  {/snippet}
</ScalarStatisticComponent>
