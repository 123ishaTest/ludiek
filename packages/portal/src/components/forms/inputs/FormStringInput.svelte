<script lang="ts">
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
    required: boolean;
    data?: string;
    placeholder?: string;
    compact?: boolean;
  }

  let {
    label,
    required,
    data,
    placeholder = '',
    compact = false,
  }: Props = $props();
</script>

{#snippet form()}
  <input name={label} id={label} {placeholder} {required} value={data} type="text" class="input w-full" />
{/snippet}

{#if compact}
  {@render form()}

{:else}
  <div class="flex flex-col">
    <label for={label}>{labelFormat(label)}</label>
    {@render form()}
  </div>
{/if}

