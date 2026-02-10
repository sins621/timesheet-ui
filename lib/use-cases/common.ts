import type { AuthHeaders } from "../types/common.ts";

export function constructBearerAuthHeaders(token: string): AuthHeaders {
  return { Authorization: `Bearer ${token}` };
}

export function constructBasicAuthHeaders(
  username: string,
  password: string,
): AuthHeaders {
  return {
    Authorization: Buffer.from(`${username}:${password}`).toString("base64"),
  };
}
