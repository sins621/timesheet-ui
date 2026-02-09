import {
  emailSchema,
  timeSchema,
  projectClientSchema,
  projectSchema,
  entrySchema,
  costCodeIDSchema,
} from "../schemas/warp.ts";
import { z } from "zod";

export type CostCodeID = z.infer<typeof costCodeIDSchema>;
export type WarpTime = z.infer<typeof timeSchema>;

export type ProjectClient = z.infer<typeof projectClientSchema>;
export type Project = z.infer<typeof projectSchema>;

export type Entry = z.infer<typeof entrySchema>;

export type WarpEmail = z.infer<typeof emailSchema>;
