import { z } from "zod";
import { COST_CODE_IDS } from "../constants/warp.ts";

export const tokenResponseSchema = z.object({
  token: z.string(),
});

export const domainRegex = /@[A-Za-z]+\.[A-Za-z]+/i;
export const emailSchema = z
  .email({ pattern: domainRegex })
  .brand<"warpEmail">();
export const apiBool = z.union([z.literal(0), z.literal(1)]);
export const costCodeIDSchema = z.enum(COST_CODE_IDS);

export const timeSchema = z.iso.datetime({ local: true }).brand<"warpTime">();

export const projectClientSchema = z
  .object({
    GroupId: z.number(),
    Name: z.string(),
    Currency: z.string(),
  })
  .brand<"warpProjectClient">();

export const projectSchema = z.object({
  Taskid: z.number(),
  Name: z.string(),
  IsActive: z.boolean(),
  Created_On: timeSchema,
  Updated_On: timeSchema,
  Client: projectClientSchema,
}).brand<"warpProject">;

export const entrySchema = z
  .object({
    TaskId: z.number(),
    PersonId: z.number(),
    CostCodeId: costCodeIDSchema,
    DepartmentId: z.number(),
    Overtime: apiBool,
    EntryDate: timeSchema,
    Comments: z.string(),
    WorkLogId: apiBool,
    Audited: apiBool,
  })
  .brand<"warpEntry">();
