import { ENDPOINTS as warpEndpoints } from "../constants/warp.ts";
import type { WarpEmail } from "../types/warp.ts";
import { Result, ResultAsync, err, ok } from "neverthrow";
import { got } from "got";
import { tokenResponseSchema } from "../schemas/warp.ts";

export async function getAuthToken(
  email: WarpEmail,
  password: string,
): Promise<Result<string, string>> {
  const result = await ResultAsync.fromPromise(
    got
      .post(warpEndpoints.authorise.url, {
        json: {
          Email: email,
          Password: password,
        },
      })
      .json(),
    () => new Error(`Request to ${warpEndpoints.authorise.url} failed`),
  );

  if (result.isErr()) return err("Error getting auth token");

  const parseResult = tokenResponseSchema.safeParse(result.value);

  if (!parseResult.success) return err("Token parsing failed");

  return ok(parseResult.data.token);
}
