<script lang="ts">
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
    required: boolean;
  }

  let { label, required }: Props = $props();
</script>

<label class="label">
  <input {required} type="checkbox" class="checkbox" />
  <span>{labelFormat(label)}</span>
</label>

