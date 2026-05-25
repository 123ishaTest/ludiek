<script lang="ts">
  interface Props {
    value: number;
  }

  let { value }: Props = $props();
</script>

<p>{value}</p>
