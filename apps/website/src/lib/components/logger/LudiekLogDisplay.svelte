<script lang="ts">
  import { onMount } from 'svelte';
  import { type LudiekLog, LudiekLogger, LudiekLogLevel } from '@123ishatest/ludiek';

  interface Props {
    logger: LudiekLogger;
  }

  let { logger }: Props = $props();

  let minimumLevel = $state(LudiekLogLevel.Info);
  let count = $state(100);

  let logs: LudiekLog[] = $state([]);

  const formatDate = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  onMount(() => {
    logs = logger.getLogs(minimumLevel, count);
    return logger.onLogEvent.subscribe(() => {
      logs = logger.getLogs(minimumLevel, count);
    });
  });

  const levelClass = (level: LudiekLogLevel) => {
    switch (level) {
      case LudiekLogLevel.Debug:
        return 'text-accent';
      case LudiekLogLevel.Info:
        return 'text-info';
      case LudiekLogLevel.Warn:
        return 'text-warning';
      case LudiekLogLevel.Error:
        return 'text-error';
    }
  };

  const levelName = (level: LudiekLogLevel) => {
    switch (level) {
      case LudiekLogLevel.Debug:
        return 'Debug';
      case LudiekLogLevel.Info:
        return 'Info';
      case LudiekLogLevel.Warn:
        return 'Warning';
      case LudiekLogLevel.Error:
        return 'Error';
    }
  };
</script>

<div class="join mb-4">
  <button
    onclick={() => (minimumLevel = LudiekLogLevel.Debug)}
    class="btn btn-accent join-item {minimumLevel !== LudiekLogLevel.Debug ? 'opacity-25' : ''}"
    >Debug
  </button>
  <button
    onclick={() => (minimumLevel = LudiekLogLevel.Info)}
    class="btn btn-info join-item {minimumLevel !== LudiekLogLevel.Info ? 'opacity-25' : ''}"
    >Info
  </button>
  <button
    onclick={() => (minimumLevel = LudiekLogLevel.Warn)}
    class="btn btn-warning join-item {minimumLevel !== LudiekLogLevel.Warn ? 'opacity-25' : ''}"
    >Warning
  </button>
  <button
    onclick={() => (minimumLevel = LudiekLogLevel.Error)}
    class="btn btn-error join-item {minimumLevel !== LudiekLogLevel.Error ? 'opacity-25' : ''}"
    >Error
  </button>

  <input class="join-item input" type="number" bind:value={count} />
</div>

<div class="overflow-hidden border border-zinc-700 bg-zinc-950">
  <div
    class="grid grid-cols-[40px_100px_100px_1fr_320px] gap-4 border-b border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-200"
  >
    <div></div>
    <div>Time</div>
    <div>Level</div>
    <div>Message</div>
    <div>Data</div>
  </div>

  <div class="overflow-auto">
    {#each logs as log, i (i)}
      <details class="group border-b border-zinc-800 {!log.data ? 'pointer-events-none' : ''}">
        <summary
          class={`grid cursor-pointer grid-cols-[40px_100px_100px_1fr_320px] gap-4 px-4 py-3 hover:bg-zinc-900/60 ${levelClass(log.level)}`}
        >
          <span class="flex items-center justify-center">
            {#if log.data}
              <span class="transition-transform duration-150 group-open:rotate-90"> ▶ </span>
            {/if}
          </span>

          <span class="truncate whitespace-nowrap">{formatDate(log.timestamp)}</span>
          <span class="font-medium">{levelName(log.level)}</span>
          <span class="truncate">{log.message}</span>
          <span class="truncate text-zinc-400">{JSON.stringify(log.data)}</span>
        </summary>

        <div class="border-t border-zinc-800 bg-black/20">
          <pre class=" bg-zinc-900 p-4 text-xs text-zinc-100"><code>{JSON.stringify(log.data, null, 2)}</code></pre>
        </div>
      </details>
    {/each}
  </div>
</div>
