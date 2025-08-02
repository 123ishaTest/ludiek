export interface BaseRequirement {
  type: string;
}

export interface RequirementChecker<Requirement extends BaseRequirement> {
  type: string;
  has(req: Requirement): boolean;
}

export type CheckerRequirement<Checker> = Checker extends RequirementChecker<infer Requirement> ? Requirement : never;

// Build the union of all shapes
export type Requirement<Checkers extends RequirementChecker<BaseRequirement>[]> = CheckerRequirement<Checkers[number]>;
