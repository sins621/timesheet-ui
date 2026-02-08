import { z } from "zod";

export const tokenResponseSchema = z.object({
  token: z.string(),
});

export const warpDomainRegex = /@[A-Za-z]+\.[A-Za-z]+/i;
export const warpEmailSchema = z.email({ pattern: warpDomainRegex }).brand<"warpEmail">();
