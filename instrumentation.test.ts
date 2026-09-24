import { register, onRequestError } from "./instrumentation";
import { registerOTel } from "@vercel/otel";
import { trace, SpanStatusCode } from "@opentelemetry/api";

jest.mock("@vercel/otel", () => ({
  registerOTel: jest.fn(),
}));

jest.mock("@opentelemetry/api", () => {
  const mockSpan = {
    recordException: jest.fn(),
    setStatus: jest.fn(),
    setAttribute: jest.fn(),
  };
  return {
    trace: {
      getActiveSpan: jest.fn(() => mockSpan),
    },
    SpanStatusCode: {
      ERROR: 2,
    },
    __mockSpan: mockSpan,
  };
});

describe("OpenTelemetry Instrumentation", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it("skips registration when OTEL_SDK_DISABLED is 'true'", () => {
    process.env.OTEL_SDK_DISABLED = "true";
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    register();

    expect(registerOTel).not.toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Instrumentation hook skipped"),
    );
    consoleSpy.mockRestore();
  });

  it("registers OTel and deletes OTEL_SDK_DISABLED when it is 'false' (truthiness safeguard)", () => {
    process.env.OTEL_SDK_DISABLED = "false";
    process.env.OTEL_SERVICE_NAME = "aminwebsite-test";
    const consoleSpy = jest.spyOn(console, "log").mockImplementation();

    register();

    expect(process.env.OTEL_SDK_DISABLED).toBeUndefined();
    expect(registerOTel).toHaveBeenCalledWith({
      serviceName: "aminwebsite-test",
    });
    consoleSpy.mockRestore();
  });

  it("records exception and error attributes on active span in onRequestError", async () => {
    process.env.OTEL_SDK_DISABLED = "false";
    const error = new Error("Test server error");
    (error as unknown as { digest: string }).digest = "digest-1234";

    const request = {
      path: "/en/projects",
      method: "GET",
      headers: {},
    };

    const context = {
      routerKind: "App Router" as const,
      routePath: "/[locale]/projects",
      routeType: "render" as const,
    };

    await onRequestError(error, request, context);

    const { __mockSpan } = jest.requireMock("@opentelemetry/api");
    expect(__mockSpan.recordException).toHaveBeenCalledWith(error);
    expect(__mockSpan.setStatus).toHaveBeenCalledWith({
      code: SpanStatusCode.ERROR,
      message: "Test server error",
    });
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("next.error.digest", "digest-1234");
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("next.error.router_kind", "App Router");
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("next.error.route_path", "/[locale]/projects");
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("next.error.route_type", "render");
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("http.target", "/en/projects");
    expect(__mockSpan.setAttribute).toHaveBeenCalledWith("http.method", "GET");
  });
});
