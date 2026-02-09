import { describe, it, expect, afterEach } from "vitest";
import nock from "nock";
import { getAuthToken } from "./warp.ts";
import { emailSchema } from "../schemas/warp.ts";

afterEach(() => {
  nock.restore();
});

describe("getAuthToken", async () => {
  it("should return a token ", async () => {
    const testEmail = emailSchema.parse("some@email.com");
    const testPassword = "someTestPassword";
    const correctResponse = { token: "someToken" }

    nock("https://office.warpdevelopment.com")
      .post("/api/account/authorise", {
        Email: testEmail,
        Password: testPassword,
      })
      .reply(200, correctResponse);

    const result = await getAuthToken(testEmail, testPassword);
    if (result.isErr()) return console.log(result.error);
    expect(result.value).toBe(correctResponse.token);
  });
  it("should return an error result if request failes", async () => {
    const testEmail = emailSchema.parse("some@email.com");
    const testPassword = "someTestPassword";

    nock("https://office.warpdevelopment.com")
      .post("/api/account/authorise", {
        Email: testEmail,
        Password: testPassword,
      })
      .replyWithError("Network failure")

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
      .reply(200, { someNonsense: "" })

    const result = await getAuthToken(testEmail, testPassword);
    expect(result.isErr()).toBe(true);
  });
});
