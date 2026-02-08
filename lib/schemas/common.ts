import { z } from "zod";

export const urlSchema = z.url().brand<"Url">();
export const warpDomainRegex = /@[A-Za-z]+\.[A-Za-z]+/i;

export const warpEmailSchema = z.email({ pattern: warpDomainRegex }).brand<"warpEmail">();
