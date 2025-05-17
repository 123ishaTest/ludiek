<script lang="ts">
  import './app.css';
  import { Game } from '@123ishatest/ludiek';
  import ContentSidebar from './components/ContentSidebar.svelte';
  import FormDecisionInput from './components/forms/FormDecisionInput.svelte';
  import SchemaForm from './components/forms/SchemaForm.svelte';

  interface Props { game: Game }

  let { game }: Props = $props();

  let numberSchema  = game.engine.introspect().effect;


</script>

<div class="flex flex-row space-x-4">
  <ContentSidebar {game}/>
  <p>This will be a portal some day</p>

</div>

<SchemaForm schema={numberSchema}/>
