import { env } from "./env.ts";
import { getAuthToken, getProjects } from "./lib/use-cases/warp.ts";
import { emailSchema } from "./lib/schemas/warp.ts";

async function main() {
  const tokenResult = await getAuthToken(
    emailSchema.parse(env.TEST_WARP_EMAIL),
    env.TEST_WARP_PASSWORD,
  );
  if (tokenResult.isErr()) throw new Error("Error getting token")
  const projectsResult = await getProjects(tokenResult.value);
  console.log(projectsResult);
}

(async () => main())();
