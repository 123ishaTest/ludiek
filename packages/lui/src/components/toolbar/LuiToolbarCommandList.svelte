<script lang="ts">
  import type { LudiekCommand } from '@123ishatest/ludiek';

  interface Props {
    commands: LudiekCommand[];
    kind: string
  }

  let { commands, kind }: Props = $props();
</script>

<ul class="list rounded-box shadow-md">
  {#each commands as command (command.command)}
    {@const args = command.arguments.map(a => `<${a.field}>`).join(' ')}
    <li class="list-row">
      <div class="list-col-grow text-left">{command.command}</div>
      <div class="text-base-content/50">{args}</div>
    </li>
  {:else}
    <li class="list-row">No {kind} registered</li>
  {/each}
</ul>