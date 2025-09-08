<script lang="ts">
  import { LootTablePlugin } from '@123ishatest/ludiek';
  import type { BaseOutputShape } from '@123ishatest/ludiek/dist/engine/output/LudiekOutput';

  const lootTable = new LootTablePlugin();

  const tables = [
    {
      id: '/lootTable/demo',
      always: [
        { output: { type: '/output/currency', id: '/currency/money', amount: 1 } },
        { output: { type: '/output/currency', id: '/currency/gems', amount: 1 } },
      ],
      oneOf: [
        { output: { type: '/output/item', id: '/item/fish', amount: 3 }, weight: 10 },
        { output: { type: '/output/item', id: '/item/wood', amount: 2 }, weight: 1 },
      ],
      anyOf: [
        { output: { type: '/output/currency', id: '/currency/money', amount: 10 }, percentage: 1 / 2 },
        { output: { type: '/output/currency', id: '/currency/gems', amount: 10 }, percentage: 1 / 3 },
        { output: { type: '/output/item', id: '/item/rare', amount: 1 }, percentage: 1 / 100 },
        { output: { type: '/output/item', id: '/item/ultra-rare', amount: 1 }, percentage: 1 / 10000 },
      ],
    },
  ];
  lootTable.loadContent(tables);

  type DemoOutput = BaseOutputShape & { id: string };

  let rollResult: DemoOutput[] = $state([]);
  let sortedRolls = $derived(rollResult.toSorted((a, b) => b.amount - a.amount));
  const rollOnce = () => {
    rollResult = lootTable.roll('/lootTable/demo', 1, true) as DemoOutput[];
  };
  const rollTen = () => {
    rollResult = lootTable.roll('/lootTable/demo', 10, true) as DemoOutput[];
  };
  const rollThousand = () => {
    rollResult = lootTable.roll('/lootTable/demo', 1000, true) as DemoOutput[];
  };
</script>

<div class="card card-border bg-base-200 my-8 w-full sm:w-96">
  <div class="card-body">
    <div class="flex flex-row justify-center">
      <span class="card-title">Loot Plugin</span>
    </div>
    <div class="flex flex-row justify-center space-x-4">
      <button class="btn btn-primary" onclick={() => rollOnce()}>Roll 1</button>
      <button class="btn btn-secondary" onclick={() => rollTen()}>Roll 10</button>
      <button class="btn btn-accent" onclick={() => rollThousand()}>Roll 1000</button>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>Type</th>
          <th>Id</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {#each sortedRolls as rollEntry (rollEntry.id)}
          <tr>
            <td>{rollEntry.type}</td>
            <td>{rollEntry.id}</td>
            <td>{rollEntry.amount}</td>
          </tr>
        {:else}
          <tr>
            <td>Let's get rolling!</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
