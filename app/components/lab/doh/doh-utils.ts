import type {
  DohResolverConfig,
  DohResolverId,
  DohRecordType,
  DohQueryResult,
  DohAnswerRecord,
  DohStatus,
} from "./doh-types";

export const DOH_RESOLVERS: Record<DohResolverId, DohResolverConfig> = {
  cloudflare: {
    id: "cloudflare",
    name: "Cloudflare (1.1.1.1)",
    url: "https://cloudflare-dns.com/dns-query",
    corsEnabled: true,
    provider: "Cloudflare, Inc.",
  },
  google: {
    id: "google",
    name: "Google Public DNS (8.8.8.8)",
    url: "https://dns.google/resolve",
    corsEnabled: true,
    provider: "Google LLC",
  },
  quad9: {
    id: "quad9",
    name: "Quad9 (9.9.9.9)",
    url: "https://dns.quad9.net:5053/dns-query",
    corsEnabled: true,
    provider: "Quad9 Foundation",
  },
  custom: {
    id: "custom",
    name: "Custom Endpoint",
    url: "",
    corsEnabled: true,
    provider: "User Configured",
  },
};

export const RECORD_TYPES: DohRecordType[] = ["A", "AAAA", "CNAME", "MX", "TXT"];

export const QUICK_DOMAINS = [
  "google.com",
  "cloudflare.com",
  "wikipedia.org",
  "github.com",
  "bbc.com",
];

// Map DNS numeric types to standard string names
export const DNS_TYPE_MAP: Record<number, string> = {
  1: "A",
  2: "NS",
  5: "CNAME",
  6: "SOA",
  15: "MX",
  16: "TXT",
  28: "AAAA",
  257: "CAA",
};

/**
 * Check whether an IP string is a bogon, private subnet, or known censorship redirection address.
 */
export function isBogonOrPoisonedIp(ip: string): boolean {
  const cleanIp = ip.trim();
  // 127.0.0.0/8 (Loopback)
  if (/^127\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(cleanIp)) return true;
  // 0.0.0.0 (Invalid)
  if (cleanIp === "0.0.0.0" || cleanIp === "::" || cleanIp === "::1") return true;
  // 10.10.34.x / 10.x.x.x (Known censorship redirect & private IPv4)
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(cleanIp)) return true;
  // 192.168.x.x (Private IPv4)
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(cleanIp)) return true;
  // 172.16-31.x.x (Private IPv4)
  if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(cleanIp)) return true;

  return false;
}

/**
 * Perform a browser-native RFC 8484 DNS over HTTPS query directly against an upstream resolver.
 */
export async function executeDohQuery(
  resolverId: DohResolverId,
  customUrl: string,
  domain: string,
  recordType: DohRecordType,
  signal?: AbortSignal,
): Promise<DohQueryResult> {
  const config = DOH_RESOLVERS[resolverId];
  const baseUrl = resolverId === "custom" ? customUrl.trim() : config.url;

  const normalizedDomain = domain.trim().toLowerCase().replace(/^https?:\/\//, "");

  const startTime = performance.now();
  const timestamp = new Date().toISOString();

  if (!baseUrl) {
    return {
      resolverId,
      resolverName: config.name,
      url: baseUrl,
      domain: normalizedDomain,
      recordType,
      latencyMs: 0,
      status: "timeout",
      answers: [],
      errorMessage: "Missing custom DoH endpoint URL.",
      timestamp,
    };
  }

  try {
    const url = new URL(baseUrl);
    url.searchParams.set("name", normalizedDomain);
    url.searchParams.set("type", recordType);

    const headers: HeadersInit = {
      Accept: resolverId === "google" ? "application/json" : "application/dns-json",
    };

    const response = await fetch(url.toString(), {
      method: "GET",
      headers,
      signal,
    });

    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);

    if (!response.ok) {
      return {
        resolverId,
        resolverName: config.name,
        url: baseUrl,
        domain: normalizedDomain,
        recordType,
        latencyMs,
        statusCode: response.status,
        status: response.status === 403 || response.status === 404 ? "blocked" : "timeout",
        answers: [],
        errorMessage: `HTTP ${response.status}: ${response.statusText}`,
        timestamp,
      };
    }

    const data = await response.json();
    const rawAnswers = Array.isArray(data?.Answer) ? data.Answer : [];

    const answers: DohAnswerRecord[] = rawAnswers.map(
      (ans: { name: string; type: number | string; TTL: number; data: string }) => ({
        name: ans.name,
        type: typeof ans.type === "number" ? DNS_TYPE_MAP[ans.type] ?? ans.type : ans.type,
        TTL: ans.TTL,
        data: ans.data,
      }),
    );

    // Analyze DNS Poisoning & Censorship heuristics
    let status: DohStatus = "secure";

    if (data.Status === 3) {
      status = "blocked"; // NXDOMAIN
    } else if (answers.length > 0) {
      const hasBogon = answers.some(
        (ans) =>
          (ans.type === "A" || ans.type === "AAAA") && isBogonOrPoisonedIp(ans.data),
      );
      if (hasBogon) {
        status = "poisoned";
      }
    } else if (data.Status !== 0) {
      status = "blocked";
    }

    return {
      resolverId,
      resolverName: config.name,
      url: baseUrl,
      domain: normalizedDomain,
      recordType,
      latencyMs,
      statusCode: data.Status,
      status,
      answers,
      rawJson: data,
      timestamp,
    };
  } catch (err: unknown) {
    const endTime = performance.now();
    const latencyMs = Math.round(endTime - startTime);
    const isAbort = err instanceof Error && err.name === "AbortError";

    return {
      resolverId,
      resolverName: config.name,
      url: baseUrl,
      domain: normalizedDomain,
      recordType,
      latencyMs,
      status: "timeout",
      answers: [],
      errorMessage: isAbort
        ? "Query cancelled by user."
        : "Network unreachable or blocked by CORS policy.",
      timestamp,
    };
  }
}
