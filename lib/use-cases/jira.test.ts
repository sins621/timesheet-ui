import nock from "nock";
import { it, describe, expect } from "vitest";
import { getProjects } from "../use-cases/jira.ts";
import { getExampleProjects } from "../test-data/jira.ts";
import { constructBasicAuthHeaders } from "../use-cases/common.ts";

describe("getProjects", async () => {
  it("it should return an array of projects", async () => {
    const testProjects = getExampleProjects(3);
    const testUser = "john@example.com";
    const testPassword = "abc123";
    const authHeaders = constructBasicAuthHeaders(testUser, testPassword);

    nock("https://warpdevelopment.atlassian.net")
      .get("/rest/api/3/project")
      .matchHeader("Authorization", "Basic am9obkBleGFtcGxlLmNvbTphYmMxMjM=")
      .reply(200, testProjects);

    const result = await getProjects(authHeaders);
    if (result.isErr()) {
      throw new Error(result.error);
    }
    expect(result.isOk()).toBe(true);
    expect(result.value).toEqual(testProjects);
  })
});
