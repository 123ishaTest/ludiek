<script lang="ts">
  import './app.css';
  import { Game } from '@123ishatest/ludiek';
  import { type ContentUnit } from '@123ishatest/content-parser';
  import SchemaForm from './components/forms/SchemaForm.svelte';
  import ContentTable from './components/pages/ContentTable.svelte';


  interface Props {
    game: Game;

    content: ContentUnit[]
  }

  let { game, content}: Props = $props();

  // let numberSchema = game.engine.introspect().effect;

  let walletContribution = game.features.statistics.getEngineContribution();

  console.log("all units", content)

</script>

<div>Portal</div>
<!--<div class="flex flex-row space-x-4">-->
<!--  <ContentSidebar {game}/>-->
<!--  <p>This will be a portal some day</p>-->
<!--</div>-->

<!--<SchemaForm schema={numberSchema}/>-->

<!--<FeatureOverview contribution={walletContribution} />-->

<ContentTable units={content} schema={game.engine.content['currency']}></ContentTable>
