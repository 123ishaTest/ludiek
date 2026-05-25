<script lang="ts">
  interface Props {
    value: string;
  }

  let { value }: Props = $props();
</script>

<p>{value}</p>