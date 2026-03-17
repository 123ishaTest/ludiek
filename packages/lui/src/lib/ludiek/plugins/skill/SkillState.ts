import { type SkillDefinition, type SkillPlugin, type Progress } from '@123ishatest/ludiek';
import { getEngine } from '$lib/util/getEngine.js';

export class SkillState implements SkillDefinition {
	private _engine = getEngine<{ plugins: [SkillPlugin] }>();
	constructor(private readonly _id: string) {}

	public get onExperienceGained(): this['skill']['onExperienceGain'] {
		return this.skill.onExperienceGain;
	}

	public get skill(): SkillPlugin {
		return this._engine.plugins.skill;
	}

	private get definition(): SkillDefinition {
		return this.skill.getSkill(this._id);
	}

	public get id(): string {
		return this.definition.id;
	}

	public get level(): number {
		return this.skill.getLevel(this._id);
	}

	public get progress(): Progress {
		return this.skill.getLevelProgress(this._id);
	}

	public get experience(): number {
		return this.skill.getExperience(this._id);
	}

	public get experiencePerLevel(): number[] {
		return this.definition.experiencePerLevel;
	}
	public get initialExperience(): number | undefined {
		return this.definition.initialExperience;
	}
}
