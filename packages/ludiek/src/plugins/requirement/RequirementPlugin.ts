import { LudiekPlugin } from '@ludiek/engine/LudiekPlugin';

interface BaseRequirement {
  type: string;
}

export interface RequirementChecker<Requirement extends BaseRequirement> {
  has(req: Requirement): boolean;
}

type CheckerRequirement<Checker> = Checker extends RequirementChecker<infer Requirement> ? Requirement : never;

// Build the union of all shapes
type Requirement<Checkers extends Record<string, RequirementChecker<BaseRequirement>>> = CheckerRequirement<
  Checkers[keyof Checkers]
>;

export class RequirementPlugin<
  Checkers extends Record<string, RequirementChecker<BaseRequirement>>,
> extends LudiekPlugin {
  name: string = 'requirement';
  private readonly _checkers: Checkers;

  constructor(checkers: Checkers) {
    super();
    this._checkers = checkers;
  }

  public hasRequirement(req: Requirement<Checkers>): boolean {
    const checker = this._checkers[req.type];
    return checker.has(req);
  }
}
