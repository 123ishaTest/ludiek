<script lang="ts">
  import { capitalize } from '@123ishatest/ludiek';
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
    required: boolean;
    placeholder?: string;
  }

  let {
    label,
    required,
    placeholder = '',

  }: Props = $props();
</script>

<div class="flex flex-col">
  <label for={label}>{labelFormat(label)}</label>

  <input name={label} id={label} {placeholder} {required} type="text" class="input w-full" />
</div>