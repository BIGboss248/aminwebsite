/**
 * @jest-environment node
 */
import {
  escapeTelegramHtml,
  formatInquiryMessage,
  isTelegramConfigured,
  sendTelegramMessage,
  type TelegramInquiry,
} from "./telegram";

const baseInquiry: TelegramInquiry = {
  refId: "INQ-TEST-1234",
  name: "Alice Wonderland",
  email: "alice@example.com",
  subject: "Architecture Review",
  message: "We would like to consult on Next.js App Router performance.",
  ip: "203.0.113.42",
  receivedAt: "2026-11-07T10:00:00.000Z",
};

describe("escapeTelegramHtml", () => {
  it("escapes every entity Telegram's HTML parser treats as markup", () => {
    expect(escapeTelegramHtml('a & b <tag> "quoted"')).toBe(
      "a &amp; b &lt;tag&gt; &quot;quoted&quot;",
    );
  });
});

describe("formatInquiryMessage", () => {
  it("includes all inquiry fields in the notification body", () => {
    const text = formatInquiryMessage(baseInquiry);

    expect(text).toContain("New portfolio inquiry");
    expect(text).toContain("INQ-TEST-1234");
    expect(text).toContain("Alice Wonderland");
    expect(text).toContain("alice@example.com");
    expect(text).toContain("Architecture Review");
    expect(text).toContain("Next.js App Router performance");
    expect(text).toContain("2026-11-07T10:00:00.000Z");
    expect(text).toContain("203.0.113.42");
  });

  it("escapes user-controlled fields so injected markup cannot break parsing", () => {
    const text = formatInquiryMessage({
      ...baseInquiry,
      name: "<b>Attacker</b> & co",
      message: "5 < 6 > 4 & \"quoted\"",
    });

    expect(text).not.toContain("<b>Attacker</b>");
    expect(text).toContain("&lt;b&gt;Attacker&lt;/b&gt; &amp; co");
    expect(text).toContain("5 &lt; 6 &gt; 4 &amp; &quot;quoted&quot;");
  });

  it("keeps the formatted message within Telegram's 4096 character limit", () => {
    const text = formatInquiryMessage({
      ...baseInquiry,
      message: "a".repeat(10_000),
    });

    expect(text.length).toBeLessThan(4096);
    expect(text).toContain("… (cut)");
  });

  it("omits optional lines when metadata is absent", () => {
    const text = formatInquiryMessage({
      refId: "INQ-X",
      name: "Bob",
      email: "bob@example.com",
      subject: "Hi",
      message: "Short but valid inquiry message.",
    });

    expect(text).not.toContain("🌐");
    expect(text).not.toContain("🗣️");
  });
});

describe("isTelegramConfigured", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("is false when either credential is missing", () => {
    delete process.env.TELEGRAM_BOT_TOKEN;
    delete process.env.TELEGRAM_CHAT_ID;

    expect(isTelegramConfigured()).toBe(false);
  });

  it("is true when both credentials are present", () => {
    process.env.TELEGRAM_BOT_TOKEN = "123:abc";
    process.env.TELEGRAM_CHAT_ID = "987654";

    expect(isTelegramConfigured()).toBe(true);
  });
});

describe("sendTelegramMessage", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env.TELEGRAM_BOT_TOKEN = "123:abc";
    process.env.TELEGRAM_CHAT_ID = "987654";
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = { ...originalEnv };
    jest.restoreAllMocks();
  });

  it("returns a configuration error without calling Telegram when unset", async () => {
    delete process.env.TELEGRAM_BOT_TOKEN;

    const result = await sendTelegramMessage(baseInquiry);

    expect(result).toEqual({ ok: false, error: "telegram_not_configured" });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("posts an HTML message to the configured chat", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ ok: true, result: { message_id: 42 } }),
    });

    const result = await sendTelegramMessage(baseInquiry);

    expect(result).toEqual({ ok: true });

    const [url, init] = (global.fetch as jest.Mock).mock.calls[0];
    expect(url).toBe("https://api.telegram.org/bot123:abc/sendMessage");
    expect(init.method).toBe("POST");

    const body = JSON.parse(init.body);
    expect(body.chat_id).toBe("987654");
    expect(body.parse_mode).toBe("HTML");
    expect(body.disable_web_page_preview).toBe(true);
    expect(body.text).toContain("INQ-TEST-1234");
  });

  it("reports HTTP failures without leaking the bot token", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400,
      text: async () => "Bad Request",
    });

    const result = await sendTelegramMessage(baseInquiry);

    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toContain("telegram_http_400");
      expect(result.error).not.toContain("123:abc");
    }
  });

  it("reports API-level rejections using Telegram's description", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ ok: false, description: "chat not found" }),
    });

    const result = await sendTelegramMessage(baseInquiry);

    expect(result).toEqual({ ok: false, error: "chat not found" });
  });

  it("never throws when the network request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error("ECONNRESET"));

    const result = await sendTelegramMessage(baseInquiry);

    expect(result).toEqual({ ok: false, error: "ECONNRESET" });
  });

  it("reports aborted timeouts by name", async () => {
    const timeoutError = new Error("The operation was aborted due to timeout");
    timeoutError.name = "TimeoutError";
    (global.fetch as jest.Mock).mockRejectedValueOnce(timeoutError);

    const result = await sendTelegramMessage(baseInquiry);

    expect(result).toEqual({ ok: false, error: "timeout" });
  });
});
