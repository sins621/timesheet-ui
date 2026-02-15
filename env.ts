import { z } from "zod";

const envSchema = z.object({
  JIRA_API_TOKEN : z.string(),
  TEST_WARP_EMAIL: z.email(),
  TEST_WARP_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);
export default env
