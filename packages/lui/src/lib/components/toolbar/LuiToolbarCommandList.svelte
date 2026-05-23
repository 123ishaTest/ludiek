<script lang="ts">
  import type { LudiekCommand } from '@123ishatest/ludiek';

  interface Props {
    commands: LudiekCommand[];
    kind: string
  }

  let { commands, kind }: Props = $props();
</script>

<ul class="d-list rounded-box shadow-md">
  {#each commands as command (command.command)}
    {@const args = command.arguments.map(a => `<${a.field}>`).join(' ')}
    <li class="d-list-row">
      <div class="d-list-col-grow text-left">{command.command}</div>
      <div class="d-text-base-content/50">{args}</div>
    </li>
  {:else}
    <li class="d-list-row">No {kind} registered</li>
  {/each}
</ul>
