<script lang="ts">
  import { capitalize, Game } from '@123ishatest/ludiek';

  interface Props {
    game: Game;
  }

  let { game }: Props = $props();
  const content = $derived(Object.entries(game.engine.content));
  const engineContent = $derived(Object.entries(game.engine.introspect()));

</script>

<ul class="menu bg-base-200 rounded-box w-64">
  <li>
    <details open>
      <summary>Engine</summary>
      <ul>
        {#each engineContent as [key]}
          <li>
            <span>
              {capitalize(key)}
            </span>
          </li>
        {/each}
      </ul>
    </details>
  </li>
  <li>
    <details open>
      <summary>Content</summary>
      <ul>
        {#each content as [key]}
          <li>
            <span>
              {capitalize(key)}
            </span>
          </li>
        {/each}
      </ul>
    </details>
  </li>
</ul>
