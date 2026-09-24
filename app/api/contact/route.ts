import { NextResponse } from "next/server";

interface ContactPayload {
  intent?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp?: string;
}

const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "127.0.0.1";

    const now = Date.now();
    const lastRequest = rateLimitMap.get(ip);
    if (lastRequest && now - lastRequest < 5000) {
      return NextResponse.json(
        { error: "rate_limit", message: "Rate limit exceeded. Please wait a moment." },
        { status: 429 },
      );
    }
    rateLimitMap.set(ip, now);

    if (rateLimitMap.size > 1000) {
      for (const [key, timestamp] of rateLimitMap.entries()) {
        if (now - timestamp > RATE_LIMIT_WINDOW_MS) {
          rateLimitMap.delete(key);
        }
      }
    }

    const body: ContactPayload = await request.json();

    if (body._hp && body._hp.trim().length > 0) {
      return NextResponse.json({
        success: true,
        refId: `SYS-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      });
    }

    if (!body.name || body.name.trim().length === 0) {
      return NextResponse.json(
        { error: "validation", field: "name", message: "Name is required." },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!body.email || !emailRegex.test(body.email.trim())) {
      return NextResponse.json(
        { error: "validation", field: "email", message: "Valid email is required." },
        { status: 400 },
      );
    }

    if (!body.subject || body.subject.trim().length === 0) {
      return NextResponse.json(
        { error: "validation", field: "subject", message: "Subject is required." },
        { status: 400 },
      );
    }

    if (!body.message || body.message.trim().length < 10) {
      return NextResponse.json(
        { error: "validation", field: "message", message: "Message must be at least 10 characters." },
        { status: 400 },
      );
    }

    const randomHex = Math.random().toString(36).substring(2, 8).toUpperCase();
    const timestampHex = Date.now().toString(36).toUpperCase().slice(-4);
    const refId = `INQ-${timestampHex}-${randomHex}`;

    console.info(`[Contact Form] Received valid message: refId=${refId}, email=${body.email}`);

    return NextResponse.json({
      success: true,
      refId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[Contact API Error]:", error);
    return NextResponse.json(
      { error: "server_error", message: "Failed to process transmission." },
      { status: 500 },
    );
  }
}
