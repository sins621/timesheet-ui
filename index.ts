import { ENDPOINTS } from "./lib/constants/warp.ts";
import { ResultAsync } from "neverthrow";
import got from "got";

async function main() {
  const result = await ResultAsync.fromPromise(
    got(ENDPOINTS.getProjects.url),
    () => new Error("Error getting projects"),
  );
  if (!result.isOk()) {
    console.log("It's not okay");
  }
}

(async () => main())();
