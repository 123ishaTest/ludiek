<script lang="ts">
  interface Props {
    label: string;
    value: string;
  }

  let { label, value }: Props = $props();
</script>

<input name={label} id={label} value={value} type="text" class="hidden" />