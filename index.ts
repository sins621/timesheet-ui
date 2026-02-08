import { env } from "./env.ts";
import { getAuthToken } from "./lib/use-cases/warp.ts";
import { warpEmailSchema } from "./lib/schemas/warp.ts";

async function main() {
  const result = await getAuthToken(warpEmailSchema.parse(env.TEST_WARP_EMAIL), env.TEST_WARP_PASSWORD);
  console.log(result);
}

(async () => main())();
