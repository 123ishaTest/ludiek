<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    title: string;
    date: string;
    children: Snippet;
    place?: 'start' | 'end';
    isCompleted?: boolean;
  }

  let { title, date, children, place = 'start', isCompleted = false }: Props = $props();

  let marginClass = $derived(place === 'start' ? 'mr-4' : 'ml-4');
  let justifyClass = $derived(place === 'start' ? 'md:text-end' : 'md:text-start');
  let dividerClass = $derived(isCompleted ? 'bg-primary' : '');
</script>

<li>
  <hr class={dividerClass} />
  <div class="timeline-{place} mb-10 {marginClass} {justifyClass}">
    <time class="font-mono italic">{date}</time>
    <div class="text-primary text-lg">{title}</div>
    {@render children()}
  </div>
  <hr class={dividerClass} />
</li>
