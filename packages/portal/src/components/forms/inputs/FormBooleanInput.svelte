<script lang="ts">
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
    required: boolean;
    compact?: boolean;
  }

  let { label, required, compact = false }: Props = $props();
</script>

{#snippet form()}
  <input {required} type="checkbox" class="checkbox" />
{/snippet}

{#if compact}
  {@render form()}

{:else}
  <label class="label">
    {@render form()}
    <span>{labelFormat(label)}</span>
  </label>
{/if}

