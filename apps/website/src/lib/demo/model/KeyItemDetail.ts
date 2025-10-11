import type { Bonus } from '$lib/demo/demo.svelte';

export interface KeyItemDetail {
  id: string;
  name: string;
  description: string;
  rewards?: Bonus[];
}
