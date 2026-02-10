import { describe, it, expect, beforeAll, afterEach } from "vitest";
import nock from "nock";
import { getAuthToken, getProjects } from "./warp.ts";
import { emailSchema } from "../schemas/warp.ts";



describe("getAuthToken", async () => {
  it("should return a token ", async () => {
    const testEmail = emailSchema.parse("some@email.com");
    const testPassword = "someTestPassword";
    const correctResponse = { token: "someToken" };

    nock("https://office.warpdevelopment.com")
      .post("/api/account/authorise", {
        Email: testEmail,
        Password: testPassword,
      })
      .reply(200, correctResponse);

    const result = await getAuthToken(testEmail, testPassword);

    expect(result.isOk()).toBe(true);

    if (result.isErr()) {
      throw new Error(result.error);
    }

    expect(result.value).toEqual(correctResponse.token);
  });
  it("should return an error result if request failes", async () => {
    const testEmail = emailSchema.parse("some@email.com");
    const testPassword = "someTestPassword";

    nock("https://office.warpdevelopment.com")
      .post("/api/account/authorise", {
        Email: testEmail,
        Password: testPassword,
      })
      .replyWithError("Network failure");

    const result = await getAuthToken(testEmail, testPassword);
    expect(result.isErr()).toBe(true);
  });
  it("should return an error result if parsing fails", async () => {
    const testEmail = emailSchema.parse("some@email.com");
    const testPassword = "someTestPassword";

    nock("https://office.warpdevelopment.com")
      .post("/api/account/authorise", {
        Email: testEmail,
        Password: testPassword,
      })
      .reply(200, { someNonsense: "" });

    const result = await getAuthToken(testEmail, testPassword);
    expect(result.isErr()).toBe(true);
  });
});

describe("getProjects", async () => {
  it("should return projects ", async () => {
    const testToken = "someBearerToken";
    const correctResponse = [
      {
        TaskId: 2,
        Name: "Hosting Website",
        IsActive: true,
        Created_On: "2007-01-10T14:49:26.093",
        Updated_On: "2007-01-10T14:49:26.093",
        Client: {
          GroupId: 2,
          Name: "Warp Development",
          Currency: "South African Rand",
        },
      },
      {
        TaskId: 3,
        Name: "Software Website",
        IsActive: true,
        Created_On: "2007-01-10T14:49:31.03",
        Updated_On: "2020-06-01T13:55:18.21",
        Client: {
          GroupId: 2,
          Name: "Warp Development",
          Currency: "South African Rand",
        },
      },
    ];

    nock("https://office.warpdevelopment.com")
      .get("/api/Project")
      .matchHeader("authorization", `Bearer ${testToken}`)
      .reply(200, correctResponse);

    const result = await getProjects(testToken);

    if (result.isErr()) {
      throw new Error(result.error);
    }
    expect(result.isOk()).toBe(true);
    expect(result.value).toEqual(correctResponse);
  });
});
