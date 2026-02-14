import { z } from "zod";

export const avatarUrlsSchema = z.
  object({
    "48x48": z.url(),
    "24x24": z.url(),
    "16x16": z.url(),
    "32x32": z.url(),
  })
  .brand<"jiraAvatarsUrl">();

export const projectCategorySchema = z.
  object({
    self: z.url(),
    id: z.number(),
    name: z.string(),
    description: z.string()
  })
  .brand<"jiraProjectCategory">();

export const projectSchema = z.
  object({
    expand: z.string(),
    self: z.url(),
    id: z.number(),
    key: z.string(),
    name: z.string(),
    avatarUrls: avatarUrlsSchema,
    projectCategory: projectCategorySchema.optional(),
    projectTypeKey: z.string(),
    simplified: z.boolean(),
    style: z.string(),
    isPrivate: z.boolean(),
    properties: z.object().optional()
  })
  .brand<"jiraProjectSchema">();
