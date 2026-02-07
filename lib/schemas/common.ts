import { z } from "zod";

export const urlSchema = z.url().brand<"Url">();
