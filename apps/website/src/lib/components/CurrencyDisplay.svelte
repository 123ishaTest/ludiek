<script lang="ts">
  import type { CurrencyDetail } from '$lib/demo/model/CurrencyDetail';
  import type { Asset } from '$app/types';
  import { asset } from '$app/paths';

  interface Props {
    amount: number;
    currency: CurrencyDetail;
  }

  let { amount, currency }: Props = $props();

  const icon = $derived(asset(currency.icon as Asset));
</script>

<div class="flex flex-row items-center space-x-1">
  <img class="pixelated h-6 w-6" src={icon} alt={currency.name} />
  <span>{amount}</span>
</div>
