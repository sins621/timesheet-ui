import { ENDPOINTS as warpEndpoints } from "../constants/warp.ts";
import type { WarpEmail, Project } from "../types/warp.ts";
import { Result, ResultAsync, err, ok } from "neverthrow";
import { got } from "got";
import { tokenResponseSchema, projectSchema } from "../schemas/warp.ts";

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
    (e) =>
      new Error(
        `Request to ${warpEndpoints.authorise.url} failed: ${String(e)}`,
      ),
  );

  if (result.isErr())
    return err(`Error getting auth token, err: ${result.error}`);

  const parseResult = Result.fromThrowable(
    () => tokenResponseSchema.parse(result.value),
    (e) => new Error(`Parse failed, err: ${String(e)}`),
  )();

  if (parseResult.isErr())
    return err(`Token parsing failed, err: ${parseResult.error}`);

  return ok(parseResult.value.token);
}

export async function getProjects(
  token: string,
): Promise<Result<Project[], string>> {
  const result = await ResultAsync.fromPromise(
    got
      (warpEndpoints.getProjects.url, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      })
      .json(),
    (e) =>
      new Error(
        `Request to ${warpEndpoints.getProjects.url} failed: ${String(e)}`,
      ),
  );

  if (result.isErr())
    return err(`Error getting projects, err: ${result.error}`);

  const parseResult = Result.fromThrowable(
    () => projectSchema.array().parse(result.value),
    (e) => new Error(`Parse failed, err: ${String(e)}`),
  )();

  if (parseResult.isErr())
    return err(`Project parsing failed, err: ${parseResult.error}`);

  return ok(parseResult.value);
}
