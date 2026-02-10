import { avatarUrlsSchema, projectCategorySchema, projectSchema } from "../schemas/jira.ts";
import { z } from "zod";

export type AvatarUrls = z.infer<typeof avatarUrlsSchema>;
export type ProjectCategory = z.infer<typeof projectCategorySchema>;
export type Project = z.infer<typeof projectSchema>;
