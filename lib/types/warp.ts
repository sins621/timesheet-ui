import { COST_CODE_IDS } from "../constants/warp.ts";

export type CostCodeID = (typeof COST_CODE_IDS)[keyof typeof COST_CODE_IDS];

export type Entry = {
  TaskId: number;
  PersonId: number;
  CostCodeId: CostCodeID;
  DepartmentId: number;
  Overtime: 0 | 1;
  EntryDate: Date;
  Comments: string;
  WorkLogId: 0 | 1;
  Audited: 0 | 1;
};
