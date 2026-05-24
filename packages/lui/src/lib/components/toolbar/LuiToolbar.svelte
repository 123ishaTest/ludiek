<script lang="ts">
  import ContentIcon from '@lucide/svelte/icons/book-open-text';
  import FeatureIcon from '@lucide/svelte/icons/joystick';
  import PluginIcon from '@lucide/svelte/icons/plug';
  import ConditionIcon from '@lucide/svelte/icons/equal';
  import InputIcon from '@lucide/svelte/icons/square-arrow-right-enter';
  import OutputIcon from '@lucide/svelte/icons/square-arrow-right-exit';
  import BonusIcon from '@lucide/svelte/icons/sparkles';
  import RequestIcon from '@lucide/svelte/icons/mail-question-mark';
  import CloseIcon from '@lucide/svelte/icons/x';
  import { getIntrospection } from '../../util/context.js';
  import LuiVersion from '../LuiVersion.svelte';
  import LuiToolbarEntry from './LuiToolbarEntry.svelte';
  import LuiToolbarCommandList from './LuiToolbarCommandList.svelte';

  const introspection = getIntrospection();

  let conditionCount = $derived(introspection.condition.commands.length);
  let inputCount = $derived(introspection.input.commands.length);
  let outputCount = $derived(introspection.output.commands.length);
  let requestCount = $derived(introspection.request.commands.length);
  let bonusCount = $derived(introspection.bonus.commands.length);

  let isVisible = $state(true);

  const closeToolbar = () => {
    isVisible = false;
  };
  const openToolbar = () => {
    isVisible = true;
  };
</script>

{#if isVisible}
  <div class="lui w-full h-12 flex flex-row items-center z-60 px-2">

    <div class="flex flex-row items-center space-x-4">

      <div class="flex flex-row">
        <a class="d-btn d-btn-primary" href="https://ludiek.123ishatest.com/docs" target="_blank">
          <span>Ludiek</span>
          <LuiVersion />
        </a>
      </div>

      <LuiToolbarEntry BadgeIcon={ContentIcon} value={introspection.content.kinds.length}>
        <ul class="d-list d-rounded-box shadow-md">
          {#each introspection.content.kinds as kind (kind.kind)}
            <li class="d-list-row">
              <div class="text-left capitalize">{kind.kind}</div>
            </li>
          {:else}
            <li class="d-list-row">No content registered</li>
          {/each}
        </ul>
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={FeatureIcon} value={introspection.features.features.length}>
        <ul class="d-list d-rounded-box shadow-md">
          {#each introspection.features.features as feature (feature.type)}
            <li class="d-list-row">
              <div class="text-left capitalize">{feature.type}</div>
            </li>
          {:else}
            <li class="d-list-row">No features registered</li>
          {/each}
        </ul>
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={PluginIcon} value={introspection.plugins.plugins.length}>
        <ul class="d-list d-rounded-box shadow-md">
          {#each introspection.plugins.plugins as plugin (plugin.type)}
            <li class="d-list-row">
              <div class="text-left capitalize">{plugin.type}</div>
            </li>
          {:else}
            <li class="d-list-row">No plugins registered</li>
          {/each}
        </ul>
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={ConditionIcon} value={conditionCount}>
        <LuiToolbarCommandList commands={introspection.condition.commands} kind="condition" />
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={InputIcon} value={inputCount}>
        <LuiToolbarCommandList commands={introspection.input.commands} kind="input" />
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={OutputIcon} value={outputCount}>
        <LuiToolbarCommandList commands={introspection.output.commands} kind="output" />
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={RequestIcon} value={requestCount}>
        <LuiToolbarCommandList commands={introspection.request.commands} kind="requests" />
      </LuiToolbarEntry>

      <LuiToolbarEntry BadgeIcon={BonusIcon} value={bonusCount}>
        <LuiToolbarCommandList commands={introspection.bonus.commands} kind="modifiers" />
      </LuiToolbarEntry>

    </div>

    <div class="grow"></div>

    <button class="d-btn" onclick={()=> closeToolbar()}>
      <CloseIcon />
    </button>
  </div>
{:else}
  <div class="lui absolute bottom-0 right-0 p-2 z-60">
    <button class="d-btn d-btn-primary" onclick={() => openToolbar()}>Ludiek</button>
  </div>
{/if}
