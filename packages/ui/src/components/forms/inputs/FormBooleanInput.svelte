<script lang="ts">
  import { capitalize } from '@123ishatest/ludiek';
  import { labelFormat } from '../../../util/form';

  interface Props {
    label: string;
  }

  let { label }: Props = $props();
</script>

<label class="label">
  <input type="checkbox" class="checkbox" />
  <span>{labelFormat(label)}</span>
</label>

