/**
 * @jest-environment node
 */
import { POST } from "./route";
import { isTelegramConfigured, sendTelegramMessage } from "@/lib/telegram";

jest.mock("@/lib/telegram", () => ({
  isTelegramConfigured: jest.fn(() => true),
  sendTelegramMessage: jest.fn(async () => ({ ok: true })),
}));

const mockedIsConfigured = isTelegramConfigured as jest.MockedFunction<
  typeof isTelegramConfigured
>;
const mockedSend = sendTelegramMessage as jest.MockedFunction<
  typeof sendTelegramMessage
>;

const validPayload = {
  name: "Alice Wonderland",
  email: "alice@example.com",
  subject: "Architecture Review",
  message: "We would like to consult on Next.js App Router performance.",
};

let ipCounter = 0;

function makeRequest(
  payload: Record<string, unknown> = validPayload,
  ip = `198.51.100.${++ipCounter}`,
): Request {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": ip,
    },
    body: JSON.stringify(payload),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockedIsConfigured.mockReturnValue(true);
    mockedSend.mockResolvedValue({ ok: true });
    jest.spyOn(console, "info").mockImplementation(() => {});
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("accepts a valid inquiry and dispatches it to Telegram", async () => {
    const response = await POST(makeRequest(validPayload, "198.51.100.10"));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.refId).toMatch(/^INQ-[A-Z0-9]+-[A-Z0-9]+$/);
    expect(typeof data.timestamp).toBe("string");

    expect(mockedSend).toHaveBeenCalledTimes(1);
    expect(mockedSend).toHaveBeenCalledWith(
      expect.objectContaining({
        refId: data.refId,
        name: validPayload.name,
        email: validPayload.email,
        subject: validPayload.subject,
        message: validPayload.message,
        ip: "198.51.100.10",
        receivedAt: data.timestamp,
      }),
    );
  });

  it("rejects an invalid email without notifying Telegram", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, email: "not-an-email" }),
    );

    expect(response.status).toBe(400);
    expect((await response.json()).field).toBe("email");
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("rejects a message shorter than the minimum length", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, message: "short" }),
    );

    expect(response.status).toBe(400);
    expect((await response.json()).field).toBe("message");
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("silently succeeds on honeypot submissions without notifying Telegram", async () => {
    const response = await POST(
      makeRequest({ ...validPayload, _hp: "spam-bot" }),
    );
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.refId).toMatch(/^SYS-/);
    expect(mockedSend).not.toHaveBeenCalled();
  });

  it("still reports success when Telegram delivery fails (best-effort)", async () => {
    mockedSend.mockResolvedValueOnce({ ok: false, error: "timeout" });

    const response = await POST(makeRequest(validPayload, "198.51.100.20"));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(console.error).toHaveBeenCalledWith(
      expect.stringContaining("reason=timeout"),
    );
  });

  it("skips dispatch entirely when Telegram is not configured", async () => {
    mockedIsConfigured.mockReturnValueOnce(false);

    const response = await POST(makeRequest(validPayload, "198.51.100.30"));

    expect(response.status).toBe(200);
    expect(mockedSend).not.toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("not configured"),
    );
  });

  it("rate limits repeat submissions from the same IP", async () => {
    const first = await POST(makeRequest(validPayload, "198.51.100.40"));
    const second = await POST(makeRequest(validPayload, "198.51.100.40"));

    expect(first.status).toBe(200);
    expect(second.status).toBe(429);
    expect(mockedSend).toHaveBeenCalledTimes(1);
  });
});
