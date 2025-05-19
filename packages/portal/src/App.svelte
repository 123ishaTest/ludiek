<script lang="ts">
  import './app.css';
  import { Game } from '@123ishatest/ludiek';
  import FeatureOverview from './components/FeatureOverview.svelte';

  interface Props {
    game: Game;
  }

  let { game }: Props = $props();

  // let numberSchema = game.engine.introspect().effect;

  let walletContribution = game.features.statistics.getEngineContribution();

</script>

<!--<div class="flex flex-row space-x-4">-->
<!--  <ContentSidebar {game}/>-->
<!--  <p>This will be a portal some day</p>-->
<!--</div>-->

<!--<SchemaForm schema={numberSchema}/>-->

<FeatureOverview name="Wallet" contribution={walletContribution} />