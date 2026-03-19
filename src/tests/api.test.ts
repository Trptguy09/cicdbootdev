import { describe, test, expect } from "vitest";
import { getAPIKey } from "../api/auth.ts";
import type { IncomingHttpHeaders } from "http";

describe("getAPIKey", () => {
  test("returns API key when header is valid", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey 12345",
    };

    expect(getAPIKey(headers)).toBe("12345");
  });

  test("returns null when authorization header is missing", () => {
    const headers: IncomingHttpHeaders = {};

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is undefined", () => {
    const headers: IncomingHttpHeaders = {
      authorization: undefined,
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when authorization header is empty string", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when scheme is not ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "Bearer 12345",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when no key is provided after ApiKey", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns null when malformed header (only one part)", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "InvalidFormat",
    };

    expect(getAPIKey(headers)).toBeNull();
  });

  test("returns first token after ApiKey when extra parts exist", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "ApiKey 12345 extra-data",
    };

    expect(getAPIKey(headers)).toBe("12345");
  });

  test("is case-sensitive for ApiKey keyword", () => {
    const headers: IncomingHttpHeaders = {
      authorization: "apikey 12345",
    };

    expect(getAPIKey(headers)).toBeNull();
  });
});
