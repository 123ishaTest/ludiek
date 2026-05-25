<script lang="ts">
  interface Props {
    value: object;
  }

  let { value }: Props = $props();
</script>

<span>{JSON.stringify(value, null, 22)}</span>