<script lang="ts">
  import { createSkillState, SkillPlugin } from '@123ishatest/ludiek';
  import LudiekProgress from '$lib/components/atoms/LudiekProgress.svelte';

  const skillState = $state(createSkillState());
  const skill = new SkillPlugin(skillState);
  skill.loadContent([{ id: '/skill/fishing', experiencePerLevel: [0, 0, 3, 9, 18, 30, 45, 63, 84] }]);

  let fishingLevel = $derived(skill.getLevel('/skill/fishing'));

  let fishingProgress = $derived(skill.getLevelProgress('/skill/fishing'));

  const gainExperience = () => {
    skill.gainExperience({ skill: '/skill/fishing', amount: 1 });
  };
</script>

<div class="card card-border bg-base-200 my-8 w-full sm:w-96">
  <div class="card-body">
    <div class="flex flex-row justify-center">
      <span class="card-title">Skill Plugin</span>
    </div>

    <span>Fishing level: {fishingLevel}</span>
    <LudiekProgress progress={fishingProgress}></LudiekProgress>

    <button class="btn btn-primary" onclick={() => gainExperience()}>+1 experience</button>
  </div>
</div>
