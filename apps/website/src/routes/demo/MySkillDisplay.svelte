<script lang="ts">
  import { SkillComponent } from '@123ishatest/lui';
  import LudiekProgress from '$lib/components/atoms/LudiekProgress.svelte';
  import { content } from '$lib/demo/content';

  interface Props {
    skillId: string;
  }

  let { skillId }: Props = $props();
  let skillDetail = $derived(content.getSkill(skillId));
</script>

<SkillComponent id={skillId}>
  {#snippet render(skill)}
    <div class="card-body">
      <div class="flex flex-row justify-center">
        <span class="card-title">{skillDetail.name}</span>
      </div>

      <span>Lvl: {skill.level}</span>
      <LudiekProgress progress={skill.progress}></LudiekProgress>
    </div>
  {/snippet}
</SkillComponent>
