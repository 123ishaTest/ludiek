import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';
import { BaseRequirement, Requirement, RequirementChecker } from '@ludiek/engine/LudiekRequirement';

/**
 * Collection of plugins
 */
export class LudiekEngine<
  API extends Record<string, LudiekPlugin> = Record<string, LudiekPlugin>,
  Checkers extends RequirementChecker<BaseRequirement>[] = RequirementChecker<BaseRequirement>[],
> {
  public api: API;
  private _checkers: Record<string, RequirementChecker<BaseRequirement>>;

  constructor(plugins: API, checkers: Checkers) {
    this.api = plugins;

    Object.values(plugins).forEach((plugin) => plugin.setEngine(this));

    this._checkers = {};
    Object.values(checkers).forEach((checker) => {
      this._checkers[checker.type] = checker;
    });
  }

  public hasRequirement(req: Requirement<Checkers>): boolean {
    return this._checkers[req.type].has(req);
  }
}
