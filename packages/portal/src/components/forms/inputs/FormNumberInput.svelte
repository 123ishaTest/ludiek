<script lang="ts">
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
    required: boolean;
    placeholder?: string;
    compact?: boolean;
  }

  let {
    label,
    required,
    placeholder = '',
    compact = false,
  }: Props = $props();
</script>

{#snippet form()}
  <input name={label} id={label} {placeholder} {required} type="number" class="input w-full" />
{/snippet}

{#if compact}
  {@render form()}
{:else}
  <div class="flex flex-col">
    <label for={label}>{labelFormat(label)}</label>
    {@render form()}
  </div>
{/if}




