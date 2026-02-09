import { z } from "zod";

const envSchema = z.object({
  TEST_WARP_EMAIL: z.string(),
  TEST_WARP_PASSWORD: z.string(),
});

export const env = envSchema.parse(process.env);
