/**
 * Telegram Bot API Dispatch
 *
 * Server-only transport for delivering contact form inquiries to a Telegram
 * chat via the Bot API (https://core.telegram.org/bots/api#sendmessage).
 *
 * Design notes:
 * - Credentials are read at call time so tests can stub them per case and the
 *   values are never captured at module evaluation (build time).
 * - Delivery failures are reported as a discriminated result instead of an
 *   exception, because the contact endpoint treats notifications as
 *   best-effort and must not fail the visitor's submission.
 * - Error strings deliberately exclude the bot token so a logged failure can
 *   never leak credentials into container or platform logs.
 */

export interface TelegramInquiry {
  name: string;
  email: string;
  subject: string;
  message: string;
  refId: string;
  ip?: string;
  locale?: string;
  receivedAt?: string;
}

export type TelegramResult =
  | { ok: true }
  | { ok: false; error: string };

const TELEGRAM_API_BASE = "https://api.telegram.org";
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Telegram rejects any message longer than 4096 characters. Fields are capped
 * individually (rather than slicing the assembled message) so an HTML tag can
 * never be cut in half, which the HTML parser would reject outright.
 */
const FIELD_LIMITS = {
  name: 120,
  email: 200,
  subject: 200,
  message: 3000,
} as const;

export function isTelegramConfigured(): boolean {
  return Boolean(
    process.env.TELEGRAM_BOT_TOKEN?.trim() &&
      process.env.TELEGRAM_CHAT_ID?.trim(),
  );
}

/** Escapes the entities Telegram's HTML parse mode requires. */
export function escapeTelegramHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function clamp(value: string, limit: number): string {
  const trimmed = value.trim();
  if (trimmed.length <= limit) return trimmed;
  return `${trimmed.slice(0, limit - 12).trimEnd()}… (cut)`;
}

/** Builds the HTML-formatted notification body for one inquiry. */
export function formatInquiryMessage(inquiry: TelegramInquiry): string {
  const receivedAt = inquiry.receivedAt ?? new Date().toISOString();

  const name = escapeTelegramHtml(clamp(inquiry.name, FIELD_LIMITS.name));
  const subject = escapeTelegramHtml(
    clamp(inquiry.subject, FIELD_LIMITS.subject),
  );
  const body = escapeTelegramHtml(
    clamp(inquiry.message, FIELD_LIMITS.message),
  );
  const emailText = clamp(inquiry.email, FIELD_LIMITS.email);
  const email = escapeTelegramHtml(emailText);

  const lines = [
    "📬 <b>New portfolio inquiry</b>",
    `<code>${escapeTelegramHtml(inquiry.refId)}</code>`,
    "",
    `👤 <b>${name}</b>`,
    `✉️ <a href="mailto:${email}">${email}</a>`,
    `🏷️ ${subject}`,
    "",
    `💬 ${body}`,
    "",
    `🕒 ${escapeTelegramHtml(receivedAt)}`,
  ];

  if (inquiry.ip) {
    lines.push(`🌐 ${escapeTelegramHtml(inquiry.ip)}`);
  }

  if (inquiry.locale) {
    lines.push(`🗣️ ${escapeTelegramHtml(inquiry.locale)}`);
  }

  return lines.join("\n");
}

/**
 * Sends one inquiry notification to the configured Telegram chat.
 * Never throws: inspect `result.ok` to decide whether to log a failure.
 */
export async function sendTelegramMessage(
  inquiry: TelegramInquiry,
): Promise<TelegramResult> {
  const token = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatId = process.env.TELEGRAM_CHAT_ID?.trim();

  if (!token || !chatId) {
    return { ok: false, error: "telegram_not_configured" };
  }

  try {
    const response = await fetch(
      `${TELEGRAM_API_BASE}/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: formatInquiryMessage(inquiry),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
        cache: "no-store",
        signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
      },
    );

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      const suffix = detail ? `: ${detail.slice(0, 200)}` : "";
      return {
        ok: false,
        error: `telegram_http_${response.status}${suffix}`,
      };
    }

    const payload = (await response.json().catch(() => null)) as {
      ok?: boolean;
      description?: string;
    } | null;

    if (!payload?.ok) {
      return {
        ok: false,
        error: payload?.description ?? "telegram_rejected",
      };
    }

    return { ok: true };
  } catch (error) {
    if (error instanceof Error) {
      const reason = error.name === "TimeoutError" ? "timeout" : error.message;
      return { ok: false, error: reason };
    }
    return { ok: false, error: "unknown_error" };
  }
}
